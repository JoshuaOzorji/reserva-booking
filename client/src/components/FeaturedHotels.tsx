import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const FeaturedHotels = () => {
	const { data: featuredData, isLoading } = useQuery(
		"fetchFeaturedHotels",
		apiClient.fetchFeaturedHotels,
		{ onError: () => {} },
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<main className='flex flex-col gap-2'>
			<div className='flex justify-between items-center'>
				<h1 className='text-h1 font-bold font-rubik'>Featured</h1>

				<Link
					to='/search'
					className='text-h3 hover:underline animate font-lato'>
					see more
				</Link>
			</div>
			<div className='flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-4 gap-6 font-lato animate'>
				{featuredData?.map((featured) => (
					<div className='flex flex-col border rounded-lg border-slate-300 relative'>
						<img
							className='rounded-t-lg h-[28vh] sm:h-[26vh] md:h-[30vh] object-cover object-center '
							src={featured.imageUrls[0]}
						/>

						<div className='absolute right-0 top-2 text-white bg-sec px-2 py-[3px] text-h3'>
							{featured.starRating}
						</div>
						<div className='flex flex-col p-2 text-h4'>
							<Link
								to={`/detail/${featured._id}`}
								className='font-bold hover:underline cursor-pointer'>
								{featured.name}
							</Link>
							<span className='font-light'>{featured.country}</span>
						</div>
					</div>
				))}
			</div>
		</main>
	);
};

export default FeaturedHotels;
