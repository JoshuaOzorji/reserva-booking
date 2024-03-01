import { useEffect } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";

export type SignInFormData = {
	email: string;
	password: string;
};

const SignIn = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { showToast } = useAppContext();
	const navigate = useNavigate();
	const queryClient = useQueryClient();

	const location = useLocation();

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm<SignInFormData>();

	const mutation = useMutation(apiClient.signIn, {
		onSuccess: async () => {
			showToast({ message: "Sign in Successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			navigate(location.state?.from?.pathname || "/");
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	return (
		<main className='flex items-center justify-center my-6'>
			<div className='p-10 w-[100%] md:w-[50%] mx-auto  text-secText border-x shadow-md'>
				<h2 className='text-h2 font-rubik font-bold text-center my-6'>
					Sign In
				</h2>
				<form
					className='flex flex-col font-lato text-h2 gap-y-2 md:gap-y-4'
					onSubmit={onSubmit}>
					{/* EMAIL */}
					<label className='form-label'>
						Email
						<input
							type='email'
							{...register("email", { required: "This field is required" })}
							className='form-input'
						/>
						{errors.email && (
							<span className='required-class'>{errors.email.message}</span>
						)}
					</label>

					{/* PASSWORD */}
					<label className='form-label'>
						Password
						<input
							type='password'
							{...register("password", {
								required: "This field is required",
								minLength: {
									value: 6,
									message: "Password must be at least 6 characters",
								},
							})}
							className='form-input'
						/>
						{errors.password && <span className='required-class'></span>}
					</label>

					{/* OPTIONAL REGISTER */}
					<div className='mx-auto'>
						<span className='flex gap-x-2 text-h4 items-center flex-wrap'>
							<p>Not Registered? </p>
							<Link to='/register' className='underline'>
								Create an account here{" "}
							</Link>
						</span>
					</div>

					{/* SUBMIT */}
					<div className='mx-auto'>
						<button type='submit' className='button text-h3'>
							Submit
						</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default SignIn;
