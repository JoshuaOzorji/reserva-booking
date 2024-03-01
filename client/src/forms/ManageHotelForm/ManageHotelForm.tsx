import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import TypeSection from "./TypeSection";
import { HotelType } from "../../../../api/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
	name: string;
	city: string;
	country: string;
	description: string;
	type: string;
	pricePerNight: number;
	starRating: number;
	facilities: string[];
	imageFiles: FileList;
	imageUrls: string[];
	adultCount: number;
	childCount: number;
};

type Props = {
	hotel?: HotelType;
	onSave: (hotelFormData: FormData) => void;
	isLoading: boolean;
};

const ManageHotelForm = ({ onSave, isLoading, hotel }: Props) => {
	const formMethods = useForm<HotelFormData>();
	const { handleSubmit, reset } = formMethods;

	useEffect(() => {
		reset(hotel);
	}, [hotel, reset]);

	const onSubmit = handleSubmit(async (formDataJson: HotelFormData) => {
		//create new FormData object & call our API
		const formData = new FormData();
		if (hotel) {
			formData.append("hotelId", hotel._id);
		}
		formData.append("name", formDataJson.name);
		formData.append("city", formDataJson.city);
		formData.append("country", formDataJson.country);
		formData.append("description", formDataJson.description);
		formData.append("type", formDataJson.type);
		formData.append("pricePerNight", formDataJson.pricePerNight.toString());
		formData.append("starRating", formDataJson.starRating.toString());
		formData.append("adultCount", formDataJson.adultCount.toString());
		formData.append("childCount", formDataJson.childCount.toString());

		formDataJson.facilities.forEach((facility, index) => {
			formData.append(`facilities[${index}]`, facility);
		});

		if (formDataJson.imageUrls) {
			formDataJson.imageUrls.forEach((url, index) => {
				formData.append(`imageUrls[${index}]`, url);
			});
		}

		Array.from(formDataJson.imageFiles).forEach((imageFile) => {
			formData.append(`imageFiles`, imageFile);
		});

		onSave(formData);

		console.log(formData);
	});

	return (
		<FormProvider {...formMethods}>
			<form
				className='p-6 lg:w-[50%] mx-auto my-6 text-secText border-x shadow-md flex flex-col'
				onSubmit={onSubmit}>
				<h2 className='text-h1 font-rubik font-bold text-center my-6'>
					Add Hotel
				</h2>
				<div className='flex flex-col gap-y-2 font-lato'>
					<DetailsSection />
					<TypeSection />
					<FacilitiesSection />
					<GuestsSection />
					<ImagesSection />
				</div>
				<span className='mx-auto text-h3'>
					<button
						disabled={isLoading}
						type='submit'
						className='button my-3  disabled:bg-gray-500'>
						{isLoading ? "Saving" : "Save"}
					</button>
				</span>
			</form>
		</FormProvider>
	);
};

export default ManageHotelForm;
