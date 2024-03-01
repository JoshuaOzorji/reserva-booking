import { useFormContext } from "react-hook-form";
import { hotelFacilities } from "../../config/hotel-options";
import { HotelFormData } from "./ManageHotelForm";

const FacilitiesSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();
	return (
		<main>
			<h2>Facilities</h2>
			<div className='flex flex-col text-h3 md:grid grid-cols-3 gap-2 md:gap-2'>
				{hotelFacilities.map((facility) => (
					<label className='flex items-center gap-1'>
						<input
							type='checkbox'
							value={facility}
							{...register("facilities", {
								validate: (facilities) => {
									if (facilities && facilities.length > 0) {
										return true;
									} else return "At least one facility is required";
								},
							})}
						/>
						{facility}
					</label>
				))}
			</div>
			{errors.facilities && (
				<span className='required-class'>{errors.facilities.message}</span>
			)}
		</main>
	);
};

export default FacilitiesSection;
