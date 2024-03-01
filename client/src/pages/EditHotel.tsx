import { useNavigate, useParams } from "react-router-dom";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useEffect } from "react";

const EditHotel = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const navigate = useNavigate();
	const { hotelId } = useParams();
	const { showToast } = useAppContext();

	const { data: hotel } = useQuery(
		"fetchHotelById",
		() => apiClient.fetchMyHotelById(hotelId || ""),
		{ enabled: !!hotelId },
	);

	const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
		onSuccess: () => {
			showToast({ message: "Hotel updated", type: "SUCCESS" });
			setTimeout(() => {
				navigate("/my-hotels");
			}, 2000);
		},
		onError: () => {
			showToast({ message: "Error saving Hotel", type: "ERROR" });
		},
	});

	const handleSave = (hotelFormData: FormData) => {
		mutate(hotelFormData);
	};
	return (
		<div>
			<ManageHotelForm
				hotel={hotel}
				onSave={handleSave}
				isLoading={isLoading}
			/>
		</div>
	);
};

export default EditHotel;
