import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../../../api/shared/types";
import { Link } from "react-router-dom";

type Props = {
	hotel: HotelType;
};
const SearchResultsCard = ({ hotel }: Props) => {
	return (
		<main className='flex flex-col md:grid grid-cols-7 border rounded-lg gap-1 md:gap-4 shadow-sm'>
			<img
				src={hotel.imageUrls[0]}
				className='w-full h-full object-cover object-center md:col-span-2'
			/>

			<section className='md:col-span-5 m-2 flex flex-col gap-y-1 md:gap-2 md:mr-4 px-2 md:px-0'>
				<div className='flex flex-col items-center md:items-start'>
					<span className='flex'>
						{Array.from({ length: hotel.starRating }).map(() => (
							<AiFillStar className='fill-yellow-400' />
						))}
					</span>
					<span className='text-h5 font-extralight text-slate-500'>
						{hotel.type}
					</span>
				</div>
				<span className='flex flex-col md:flex-row justify-between items-center '>
					<Link
						to={`/detail/${hotel._id}`}
						className='text-2xl font-bold cursor-pointer hover:underline underline-offset-1 text-h2'>
						{hotel.name}
					</Link>
					<span className='text-h4 font-bold'>
						£{hotel.pricePerNight} per night
					</span>
				</span>

				<div className='line-clamp-3 text-h4 font-light'>
					{hotel.description}
				</div>

				<div className='flex flex-col md:flex-row justify-between items-center gap-1 md:gap-1'>
					<div className='flex gap-2 items-center'>
						{hotel.facilities.slice(0, 3).map((facility) => (
							<span className='bg-slate-200 py-1 px-2 rounded-lg font-bold text-h5'>
								{facility}
							</span>
						))}
						<span className='text-h4'>
							{hotel.facilities.length > 3 &&
								`+${hotel.facilities.length - 3} more`}
						</span>
					</div>

					<Link
						to={`/detail/${hotel._id}`}
						className='text-h5 underline underline-offset-1 hover:scale-105 animate'>
						View details
					</Link>
				</div>
			</section>
		</main>
	);
};

export default SearchResultsCard;
