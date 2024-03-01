import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	return (
		<main>
			<h2>Guests</h2>
			<div className='flex flex-col md:justify-between text-h3 '>
				<label className='form-label'>
					Adults
					<input
						className='form-input'
						type='number'
						min={1}
						{...register("adultCount", { required: "This field is required" })}
					/>
					{errors.adultCount?.message && (
						<span className='required-class'>{errors.adultCount?.message}</span>
					)}
				</label>

				<label className='form-label'>
					Children
					<input
						className='form-input'
						type='number'
						min={0}
						{...register("childCount", { required: "This field is required" })}
					/>
					{errors.childCount?.message && (
						<span className='required-class'>{errors.childCount?.message}</span>
					)}
				</label>
			</div>
		</main>
	);
};

export default GuestsSection;
