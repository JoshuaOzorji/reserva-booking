import { useEffect } from "react";

type ToastProps = {
	message: string;
	type: "SUCCESS" | "ERROR";
	onClose: () => void;
};
const Toast = ({ message, type, onClose }: ToastProps) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 5000);

		return () => {
			clearTimeout(timer);
		};
	}, [onClose]);

	const styles =
		type === "SUCCESS"
			? "fixed top-20 right-1 z-50 p-2 rounded-md bg-green-600 text-white min-w-[30%] md:max-w-[25%] md:min-w-[13%]"
			: "fixed top-20 right-1 z-50 p-2 rounded-md bg-red-600 text-white min-w-[30%] md:max-w-[25%] md:min-w-[13%]";
	return (
		<main className={styles}>
			<div className='flex justify-center items-center'>
				<span className='text-xs md:text-sm'>{message}</span>
			</div>
		</main>
	);
};

export default Toast;
