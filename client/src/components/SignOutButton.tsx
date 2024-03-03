import { useMutation, useQueryClient } from "react-query";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import Cookies from "js-cookie";

export const SignOutButton = () => {
	const queryClient = useQueryClient();
	const { showToast } = useAppContext();

	const mutation = useMutation(apiClient.signOut, {
		onSuccess: async () => {
			Cookies.remove("auth_token");
			await queryClient.invalidateQueries("validateToken");
			showToast({ message: "Signed Out!", type: "SUCCESS" });
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<button onClick={handleClick} className='underline-class'>
			Sign Out
		</button>
	);
};

export default SignOutButton;
