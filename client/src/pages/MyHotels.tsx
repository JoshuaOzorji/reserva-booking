import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import Loading from "../components/Loading";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { BsBuilding, BsMap } from "react-icons/bs";
import { useEffect } from "react";

const MyHotels = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { data: hotelData, isLoading } = useQuery(
		"fetchMyHotels",
		apiClient.fetchMyHotels,
		{ onError: () => {} },
	);

	if (isLoading) {
		return <Loading />;
	}

	if (!hotelData) {
		return <span>No Hotels found</span>;
	}

	return (
		<div className='flex flex-col my-4 font-lato'>
			<span className='flex justify-between items-center'>
				<h1 className='text-base md:text-2xl font-bold'>My Hotels</h1>
				<Link
					to='/add-hotel'
					className='text-accent bg-blue-600  animate px-2 py-1 hover:bg-sec hover:text-secText text-h3 rounded-lg'>
					Add Hotel
				</Link>
			</span>

			<div className='flex flex-col gap-4 my-4 mx-auto w-[90%]'>
				{hotelData.map((hotel) => (
					<div className='flex flex-col justify-between border border-slate-300 rounded-lg p-3 md:p-4 gap-3 hover:shadow-md animate'>
						<Link
							to={`/edit-hotel/${hotel._id}`}
							className='text-base md:text-xl font-bold underline-class'>
							{hotel.name}
						</Link>

						<div className='whitespace-pre-line text-h4 md:font-light font-normal'>
							{hotel.description}
						</div>
						<div className='flex flex-col md:flex-row gap-x-3 justify-center text-h4 gap-y-1'>
							<div className='hotels-icon'>
								<BsMap className='mr-1' />
								<p>
									{hotel.city}, {hotel.country}
								</p>
							</div>
							<div className='hotels-icon'>
								<BsBuilding className='mr-1' />
								<p>{hotel.type}</p>
							</div>
							<div className='hotels-icon'>
								<BiMoney className='mr-1' />
								<p>£{hotel.pricePerNight} per night</p>
							</div>
							<div className='hotels-icon'>
								<BiHotel className='mr-1' />
								<p>
									{hotel.adultCount} adults, {hotel.childCount} children
								</p>
							</div>
							<div className='hotels-icon'>
								<BiStar className='mr-1' />
								<p>{hotel.starRating} Star Rating</p>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default MyHotels;
