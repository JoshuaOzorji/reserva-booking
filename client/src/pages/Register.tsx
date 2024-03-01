import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
};

const Register = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { showToast } = useAppContext();

	const {
		register,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>();

	const mutation = useMutation(apiClient.register, {
		onSuccess: async () => {
			showToast({ message: "Registration successful!", type: "SUCCESS" });
			await queryClient.invalidateQueries("validateToken");
			setTimeout(() => {
				navigate("/");
			}, 3000);
		},
		onError: (error: Error) => {
			showToast({ message: error.message, type: "ERROR" });
		},
	});

	const onSubmit = handleSubmit((data) => {
		mutation.mutate(data);
	});

	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<main className='p-6 md:w-[50%] mx-auto my-6 text-secText border-x shadow-md'>
			<h2 className='text-h1 font-rubik font-bold text-center my-6'>
				Create an Account
			</h2>
			<form
				className='flex flex-col font-lato text-h2 gap-y-2 md:gap-y-4'
				onSubmit={onSubmit}>
				{/* first name*/}
				<label className='form-label'>
					First Name{" "}
					<input
						type='text'
						className='form-input'
						{...register("firstName", { required: "This field is required" })}
					/>
					{errors.firstName && (
						<span className='required-class'>{errors.firstName.message}</span>
					)}
				</label>

				{/* last name */}
				<label className='form-label'>
					Last Name{" "}
					<input
						type='text'
						className='form-input'
						{...register("lastName", { required: "This field is required" })}
					/>
					{errors.lastName && (
						<span className='required-class'>{errors.lastName.message}</span>
					)}
				</label>

				{/* email */}
				<label className='form-label'>
					Email
					<input
						type='email'
						className='form-input'
						{...register("email", {
							required: "This field is required",
						})}
					/>
					{errors.email && (
						<span className='required-class'>{errors.email.message}</span>
					)}
				</label>

				{/* password */}
				<label className='form-label'>
					Password
					<input
						type='password'
						className='form-input'
						{...register("password", {
							required: "This field is required",
							minLength: {
								value: 6,
								message: "Password must be at least 6 characters",
							},
						})}
					/>
					{errors.password && (
						<span className='required-class'>{errors.password.message}</span>
					)}
				</label>

				{/* confirm password */}
				<label className='form-label'>
					Confirm Password
					<input
						type='password'
						className='form-input'
						{...register("confirmPassword", {
							validate: (val) => {
								if (!val) {
									return "This field is required";
								} else if (watch("password") !== val) {
									return "Passwords do not match";
								}
							},
						})}
					/>
					{errors.confirmPassword && (
						<span className='required-class'>
							{errors.confirmPassword.message}
						</span>
					)}
				</label>

				{/* submit */}
				<span className='mx-auto'>
					<button type='submit' className='button'>
						Submit
					</button>
				</span>
			</form>
		</main>
	);
};

export default Register;
