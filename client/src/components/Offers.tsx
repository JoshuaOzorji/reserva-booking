import { Link } from "react-router-dom";
import image from "../img/CTA.jpg";

const Offers = () => {
	return (
		<main className='border rounded-lg flex flex-col md:flex-row items-center shadow-md'>
			<img
				src={image}
				alt='offers'
				className='md:h-[75vh] object-contain object-center'
			/>
			<div className='p-6 font-lato flex flex-col gap-1'>
				<h2 className='font-rubik text-2xl md:text-4xl font-bold'>
					Take your longest vacation yet
				</h2>
				<p className='text-h2'>
					Browse properties offering long-term stays, many at reduced monthly
					rates.
				</p>
				<span className='mt-2 text-h2'>
					<Link to='/search' className='button2'>
						Find a stay
					</Link>
				</span>
			</div>
		</main>
	);
};

export default Offers;
