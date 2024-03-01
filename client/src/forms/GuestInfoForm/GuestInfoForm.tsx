import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../contexts/AppContext";
import { useSearchContext } from "../../contexts/SearchContext";
import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";

type Props = {
	hotelId: string;
	pricePerNight: number;
};

type GuestInfoFormData = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
	const search = useSearchContext();
	const { isLoggedIn } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const {
		watch,
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<GuestInfoFormData>({
		defaultValues: {
			checkIn: search.checkIn,
			checkOut: search.checkOut,
			adultCount: search.adultCount,
			childCount: search.childCount,
		},
	});

	const checkIn = watch("checkIn");
	const checkOut = watch("checkOut");

	const minDate = new Date();
	const maxDate = new Date();

	maxDate.setFullYear(maxDate.getFullYear() + 1);

	const onSignInClick = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			"",
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount,
		);
		navigate("/sign-in", { state: { from: location } });
	};

	const onSubmit = (data: GuestInfoFormData) => {
		search.saveSearchValues(
			"",
			data.checkIn,
			data.checkOut,
			data.adultCount,
			data.childCount,
		);
		navigate(`/hotel/${hotelId}/booking`);
	};

	return (
		<main className='font-lato border p-4 rounded-lg border-slate-400 shadow-sm flex flex-col gap-3'>
			<h3 className='text-h3 font-bold text-center border rounded-md bg-slate-100 p-1'>
				Price: £{pricePerNight}
			</h3>

			<form
				className='flex flex-col gap-3 text-h3'
				onSubmit={
					isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)
				}>
				<div className='flex flex-col md:flex-row w-full justify-between items-center'>
					<p>Check in:</p>
					<DatePicker
						required
						selected={checkIn}
						onChange={(date) => setValue("checkIn", date as Date)}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={minDate}
						maxDate={maxDate}
						placeholderText='Check-in Date'
						className='min-w-full bg-white p-2 focus:outline-none text-center'
					/>
				</div>
				<div className='flex flex-col md:flex-row w-full justify-between items-center'>
					<p>Check out: </p>
					<DatePicker
						required
						selected={checkOut}
						onChange={(date) => setValue("checkOut", date as Date)}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={minDate}
						maxDate={maxDate}
						placeholderText='Check-in Date'
						className='min-w-full bg-white p-2 focus:outline-none text-center'
					/>
				</div>

				<div className='flex justify-between px-2 py-1 gap-2'>
					<label className='text-center'>
						Adults:{" "}
						<input
							className='w-full p-1 focus:outline-none font-bold text-center'
							type='number'
							min={1}
							max={20}
							{...register("adultCount", {
								required: "This field is required",
								min: { value: 1, message: "There must be at least one adult" },
								valueAsNumber: true,
							})}
						/>
					</label>

					<label className='text-center'>
						Children:{" "}
						<input
							className='w-full p-1 focus:outline-none font-bold text-center'
							type='number'
							min={0}
							max={20}
							{...register("childCount", { valueAsNumber: true })}
						/>
					</label>
					{errors.adultCount && (
						<span className='required-class'>{errors.adultCount.message}</span>
					)}
				</div>

				<div className='button2 text-center text-h4'>
					{isLoggedIn ? (
						<button>Book Now</button>
					) : (
						<button>Sign in to Continue</button>
					)}
				</div>
			</form>
		</main>
	);
};

export default GuestInfoForm;
