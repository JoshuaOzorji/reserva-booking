import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<main className='bg-slate-100'>
			<section className='bucket min-h-16 border-t flex justify-between items-center'>
				<span className='text-h3 text-white font-bold tracking-tight'>
					<Link to='/'>
						<span className='text-neutral-600'>Reserva</span>
						<span className='text-sec font-black font-lato'>.</span>
					</Link>
				</span>

				<div className='text-h4 flex gap-3 text-neutral-600 font-rubik'>
					<button className='underline-class'>Privacy Policy</button>
					<button className='md:decoration-2 underline-class animate'>
						Terms of Service
					</button>
				</div>
			</section>
		</main>
	);
};

export default Footer;
