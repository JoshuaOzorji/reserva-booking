import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
	const {
		register,
		formState: { errors },
	} = useFormContext<HotelFormData>();

	return (
		<main className='text-h3'>
			{/* NAME */}
			<label className='form-label'>
				Name{" "}
				<input
					type='text'
					className='form-input'
					{...register("name", { required: "This field is required" })}
				/>
				{errors.name && (
					<span className='required-class'>{errors.name.message}</span>
				)}
			</label>

			{/* CITY */}
			<label className='form-label'>
				City{" "}
				<input
					type='text'
					className='form-input'
					{...register("city", { required: "This field is required" })}
				/>
				{errors.city && (
					<span className='required-class'>{errors.city.message}</span>
				)}
			</label>

			{/* COUNTRY */}
			<label className='form-label'>
				Country{" "}
				<input
					type='text'
					className='form-input'
					{...register("country", { required: "This field is required" })}
				/>
				{errors.country && (
					<span className='required-class'>{errors.country.message}</span>
				)}
			</label>

			{/* DESCRIPTION */}
			<label className='form-label'>
				Description{" "}
				<textarea
					rows={5}
					className='form-input'
					{...register("description", { required: "This field is required" })}
				/>
				{errors.description && (
					<span className='required-class'>{errors.description.message}</span>
				)}
			</label>

			{/* PRICE-PER-NIGHT */}
			<label className='form-label'>
				Price Per Night{" "}
				<input
					placeholder='$'
					type='number'
					min={1}
					className='form-input'
					{...register("pricePerNight", { required: "This field is required" })}
				/>
				{errors.pricePerNight && (
					<span className='required-class'>{errors.pricePerNight.message}</span>
				)}
			</label>

			{/* STAR RATING */}
			<label className='form-label'>
				Star Rating
				<select
					className='form-input'
					{...register("starRating", {
						required: "This field is required",
					})}>
					<option value=''>Select as Rating</option>
					{[1, 2, 3, 4, 5].map((num) => (
						<option value={num}>{num}</option>
					))}
				</select>
				{errors.starRating && (
					<span className='required-class'>{errors.starRating.message}</span>
				)}
			</label>
		</main>
	);
};

export default DetailsSection;
