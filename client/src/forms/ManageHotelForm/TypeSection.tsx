import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelTypes } from "../../config/hotel-options";

const TypeSection = () => {
	const {
		register,
		watch,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	const typeWatch = watch("type");

	return (
		<main>
			<h2>Type</h2>
			<div className='flex flex-col text-h3 md:grid grid-cols-3 text-center gap-2 md:gap-3'>
				{hotelTypes.map((type) => (
					<label
						className={
							typeWatch === type
								? "cursor-pointer bg-blue-300 rounded-full px-2 md:px-4 py-1 md:py-2 transition-all duration-150 text-black"
								: "cursor-pointer bg-gray-200 rounded-full px-2 md:px-4 py-1 md:py-2 transition-all duration-150"
						}>
						<input
							type='radio'
							value={type}
							{...register("type", { required: "This field is required" })}
							className='hidden'
						/>
						<span>{type}</span>
					</label>
				))}
			</div>
			{errors.type && (
				<span className='required-class'>{errors.type.message}</span>
			)}
		</main>
	);
};

export default TypeSection;
