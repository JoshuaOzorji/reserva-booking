import { useEffect } from "react";
import FeaturedHotels from "../components/FeaturedHotels";
import Offers from "../components/Offers";

const Homepage = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);
	return (
		<main className='my-7 flex flex-col gap-6'>
			<Offers />
			<FeaturedHotels />
		</main>
	);
};

export default Homepage;
