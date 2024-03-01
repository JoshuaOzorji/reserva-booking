import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { MdDelete } from "react-icons/md";

const ImagesSection = () => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext<HotelFormData>();

	const existingImageUrls = watch("imageUrls");

	const handleDelete = (
		event: React.MouseEvent<HTMLButtonElement>,
		imageUrl: string,
	) => {
		event.preventDefault();
		setValue(
			"imageUrls",
			existingImageUrls.filter((url) => url !== imageUrl),
		);
	};
	return (
		<main className='text-h3'>
			<h2>Images</h2>

			<div className=''>
				{existingImageUrls && (
					<div className='grid grid-cols-6 gap-4 my-2'>
						{existingImageUrls.map((url) => (
							<div className='relative group'>
								<img src={url} />
								<button
									onClick={(event) => handleDelete(event, url)}
									className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white'>
									<MdDelete className='text-red-500' />
								</button>
							</div>
						))}
					</div>
				)}
				<label>
					<input
						type='file'
						multiple
						accept='image/*'
						{...register("imageFiles", {
							validate: (imageFiles) => {
								const totalLength =
									imageFiles.length + (existingImageUrls?.length || 0);

								if (totalLength === 0) {
									return "Minimum of 1 image file";
								}

								if (totalLength > 6) {
									return "Maximum of 6 image files";
								}

								return true;
							},
						})}
					/>
				</label>
			</div>
			{errors.imageFiles && (
				<span className='required-class'>{errors.imageFiles.message}</span>
			)}
		</main>
	);
};

export default ImagesSection;
