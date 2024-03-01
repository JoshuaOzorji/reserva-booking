import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect } from "react";

const Detail = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const { hotelId } = useParams();

	const { data: hotel } = useQuery(
		"fetchHotelById",
		() => apiClient.fetchHotelById(hotelId as string),
		{ enabled: !!hotelId },
	);
	if (!hotel) {
		return <></>;
	}
	return (
		<main className='my-7 flex flex-col md:flex-row gap-6 '>
			<section className='md:w-[65%] flex flex-col gap-4'>
				<div>
					<span className='flex'>
						{Array.from({ length: hotel.starRating }).map(() => (
							<AiFillStar className='fill-yellow-400' />
						))}
					</span>
					<h1 className='text-h2 font-bold font-rubik text-h2'>{hotel.name}</h1>
				</div>

				{/* IMAGE */}
				<div className=''>
					<Swiper
						autoplay={{
							delay: 3000,
							disableOnInteraction: true,
						}}
						pagination={true}
						modules={[Autoplay, Pagination]}
						className='mySwiper'>
						{hotel.imageUrls.map((image, index) => (
							<SwiperSlide key={index}>
								<img
									src={image}
									alt={hotel.name}
									className='rounded-md w-full md:h-[68vh] md:object-cover object-center'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				<div className='m-2 flex flex-col gap-3 font-lato'>
					<span className='flex mx-auto text-h4 flex-wrap items-center gap-2'>
						Facilities:
						{hotel.facilities.map((facility) => (
							<div className='border border-slate-400 rounded-sm px-3 py-1'>
								{facility}
							</div>
						))}
					</span>

					<p className='text-h3'>{hotel.description}</p>
				</div>
			</section>

			{/* FORM */}
			<aside className='md:w-[35%]'>
				<GuestInfoForm
					pricePerNight={hotel.pricePerNight}
					hotelId={hotel._id}
				/>
			</aside>
		</main>
	);
};

export default Detail;
