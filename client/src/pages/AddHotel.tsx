import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
// import Loading from "../components/Loading";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { useNavigate } from "react-router-dom";

const AddHotel = () => {
	const { showToast } = useAppContext();
	const navigate = useNavigate();

	const { mutate, isLoading } = useMutation(apiClient.addMyHotel, {
		onSuccess: () => {
			showToast({ message: "Hotel Saved!", type: "SUCCESS" });
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
			<ManageHotelForm onSave={handleSave} isLoading={isLoading} />
		</div>
	);
};

export default AddHotel;
