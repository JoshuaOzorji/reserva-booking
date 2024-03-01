import { CiSearch } from "react-icons/ci";
import { TiDeleteOutline } from "react-icons/ti";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { useSearchContext } from "../contexts/SearchContext";
import { FormEvent, useState } from "react";

const SearchBar = () => {
	const navigate = useNavigate();

	const search = useSearchContext();

	const [destination, setDestination] = useState<string>(search.destination);
	const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
	const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
	const [adultCount, setAdultCount] = useState<number>(search.adultCount);
	const [childCount, setChildCount] = useState<number>(search.childCount);

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();

		search.saveSearchValues(
			destination,
			checkIn,
			checkOut,
			adultCount,
			childCount,
		);
		navigate("/search");
	};
	const minDate = new Date();
	const maxDate = new Date();
	maxDate.setFullYear(maxDate.getFullYear() + 1);

	return (
		<form
			onSubmit={handleSubmit}
			className='-mt-8 w-full flex flex-col lg:grid lg:grid-cols-8 p-4 bg-sec rounded-lg lg:gap-x-2 gap-y-2 lg:gap-y-0 text-h3 shadow-md font-lato'>
			<div className='col-span-2 flex items-center bg-white p-2 space-x-3'>
				<MdTravelExplore className='hero-icon' />
				<input
					placeholder='Where are you going?'
					type='text'
					value={destination}
					onChange={(event) => setDestination(event.target.value)}
					className='text-center w-full form-focus'
				/>
			</div>

			{/* adults and children */}
			<div className='flex flex-col lg:flex-row  col-span-2 bg-white p-2 gap-x-2 gap-y-2'>
				<label className='flex justify-between  items-center'>
					<p className='w-[60%]'>Adults:</p>
					<input
						type='number'
						min={1}
						max={20}
						value={adultCount}
						onChange={(event) => setAdultCount(parseInt(event.target.value))}
						className='w-[40%] text-center form-focus1 rounded-md'
					/>
				</label>

				<label className='flex justify-between  items-center'>
					<p className='w-[60%]'>Children:</p>
					<input
						type='number'
						min={0}
						max={20}
						value={childCount}
						onChange={(event) => setChildCount(parseInt(event.target.value))}
						className='w-[40%] text-center form-focus form-focus1 rounded-md'
					/>
				</label>
			</div>

			{/* CheckIn & CheckOut */}
			<div className='col-span-3 flex flex-col lg:flex-row justify-between bg-white items-center p-2 gap-2 md:gap-0'>
				<div className='lg:w-[50%] flex items-center'>
					<p className='md:hidden'>Check-in</p>
					<DatePicker
						selected={checkIn}
						onChange={(date) => setCheckIn(date as Date)}
						selectsStart
						startDate={checkIn}
						endDate={checkOut}
						minDate={minDate}
						maxDate={maxDate}
						placeholderText='Check-in Date'
						className='focus:outline-none font-lato cursor-pointer text-center'
						wrapperClassName=''
					/>
				</div>
				<div className='lg:w-[50%] flex items-center'>
					<p className='md:hidden'>Check-out</p>
					<DatePicker
						selected={checkOut}
						onChange={(date) => setCheckOut(date as Date)}
						selectsEnd // Use selectsEnd for the end date
						startDate={checkIn}
						endDate={checkOut}
						minDate={checkIn} // Set the minimum date to the selected checkIn date
						maxDate={maxDate}
						placeholderText='Check-out Date'
						className='focus:outline-none font-lato cursor-pointer text-center'
						// wrapperClassName='min-w-full'
					/>
				</div>
			</div>

			{/* search and clear */}
			<div className='col-span-1 gap-x-2 flex justify-center  '>
				<button
					className='w-[50%] bg-accent p-2 flex items-center justify-center hover:bg-primary hover:text-accent animate'
					onClick={handleSubmit}>
					<CiSearch size={26} />
				</button>
				<button className='w-[50%] bg-accent p-2 mx-auto flex items-center justify-center hover:bg-red-600 hover:text-accent animate'>
					<TiDeleteOutline size={26} />
				</button>
			</div>
		</form>
	);
};

export default SearchBar;
