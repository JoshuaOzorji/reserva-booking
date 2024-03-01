import { HotelType } from "../../../api/shared/types";

type Props = {
	checkIn: Date;
	checkOut: Date;
	adultCount: number;
	childCount: number;
	numberOfNights: number;
	hotel: HotelType;
};
const BookingDetailsSummary = ({
	checkIn,
	checkOut,
	adultCount,
	childCount,
	numberOfNights,
	hotel,
}: Props) => {
	return (
		<main className='flex flex-col border p-4 text-h4 font-lato gap-2 border-slate-300 shadow-sm'>
			<h2 className='text-h2 font-bold'>Your booking details</h2>

			<div className='booking-label'>
				<p className='font-bold'>Location:</p>
				<span className=''>{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</span>
			</div>

			<div className='flex booking-label justify-between'>
				<span className=''>
					<p className='font-bold'>Check-in</p>
					<span>{checkIn.toDateString()}</span>
				</span>

				<span>
					<p className='font-bold'>Check-out</p>
					<span>{checkOut.toDateString()}</span>
				</span>
			</div>

			<div className='booking-label'>
				<p className='font-bold'>Total length of stay:</p>
				<span>{numberOfNights} night(s)</span>
			</div>

			<div className='booking-label'>
				<p className='font-bold'>Guests:</p>
				<span>
					{adultCount} adult(s) & {childCount} children
				</span>
			</div>
		</main>
	);
};

export default BookingDetailsSummary;
