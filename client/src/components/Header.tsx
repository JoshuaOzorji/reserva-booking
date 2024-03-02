import { Link } from "react-router-dom";
import SignOutButton from "./SignOutButton";
import { useAppContext } from "../contexts/AppContext";

const Header = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<main className='bg-primary py-2 md:py-4 font-rubik border-b border-accent sticky top-0 z-10'>
			<div
				className={`bucket mx-auto ${
					isLoggedIn ? "flex flex-col" : "flex flex-row"
				} items-center justify-between space-y-2 md:space-x-0`}>
				<span className='text-h1 text-white font-bold tracking-tight'>
					<Link to='/'>
						<span className='text-accent'>Reserva</span>
						<span className='text-sec font-black font-lato'>.</span>
					</Link>
				</span>

				<span className='flex space-x-2 md:space-x-4 text-accent text-h4 animate'>
					{isLoggedIn ? (
						<>
							{/* My Bookings */}
							<Link to='/my-bookings' className='underline-class'>
								My Bookings
							</Link>

							{/* My Hotels */}
							<Link to='/my-hotels' className='underline-class'>
								My Hotels
							</Link>

							{/* Sign Out */}
							<span className='underline-class'>
								<SignOutButton />
							</span>
						</>
					) : (
						<Link to='/sign-in' className='underline-class'>
							Sign In
						</Link>
					)}
				</span>
			</div>
		</main>
	);
};

export default Header;
