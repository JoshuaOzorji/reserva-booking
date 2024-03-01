/* eslint-disable no-mixed-spaces-and-tabs */
import { useQuery } from "react-query";
import { HotelSearchResponse } from "../../../api/shared/types";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import SearchResultsCard from "../components/SearchResultsCard";
import { useEffect, useState } from "react";
import Pagination from "../components/Pagination";
import FacilitiesFilter from "../components/FacilitiesFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import StarRatingFilter from "../components/StarRatingFilter";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
	// SCROLL TO TOP
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const search = useSearchContext();
	const [page, setPage] = useState<number>(1);
	const [selectedStars, setSelectedStars] = useState<string[]>([]);
	const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
	const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
	const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
	const [sortOption, setSortOption] = useState<string>("");

	const searchParams = {
		destination: search.destination,
		checkIn: search.checkIn.toISOString(),
		checkOut: search.checkOut.toISOString(),
		adultCount: search.adultCount.toString(),
		childCount: search.childCount.toString(),
		page: page.toString(),
		stars: selectedStars,
		types: selectedHotelTypes,
		facilities: selectedFacilities,
		maxPrice: selectedPrice?.toString(),
		sortOption,
	};

	const hotelQuery = useQuery<HotelSearchResponse>(
		["searchHotels", searchParams],
		() => apiClient.searchHotels(searchParams),
	);

	const hotelData = hotelQuery.data;

	const handlePageChange = (pageNumber: number) => {
		setPage(pageNumber);
	};

	const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const starRating = event.target.value;

		setSelectedStars((prevStars) =>
			event.target.checked
				? [...prevStars, starRating]
				: prevStars.filter((star) => star !== starRating),
		);
	};

	const handleHotelTypeChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		const hotelType = event.target.value;

		setSelectedHotelTypes((prevHotelTypes) =>
			event.target.checked
				? [...prevHotelTypes, hotelType]
				: prevHotelTypes.filter((hotel) => hotel !== hotelType),
		);
	};

	const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const facility = event.target.value;

		setSelectedFacilities((prevFacilities) =>
			event.target.checked
				? [...prevFacilities, facility]
				: prevFacilities.filter((prevFacility) => prevFacility !== facility),
		);
	};

	return (
		<main className='flex flex-col md:grid md:grid-cols-5 gap-6 font-lato my-6'>
			<div className='md:col-span-1 rounded-lg p-5 h-fit md:sticky top-4 border'>
				<div className='space-y-5 text-h4'>
					<h3 className='text-h4 f pb-5'>Filter by:</h3>
					<StarRatingFilter
						selectedStars={selectedStars}
						onChange={handleStarsChange}
					/>
					<HotelTypesFilter
						selectedHotelTypes={selectedHotelTypes}
						onChange={handleHotelTypeChange}
					/>
					<FacilitiesFilter
						selectedFacilities={selectedFacilities}
						onChange={handleFacilityChange}
					/>
					<PriceFilter
						selectedPrice={selectedPrice}
						onChange={(value?: number) => setSelectedPrice(value)}
					/>
				</div>
			</div>

			{/* Search results card */}
			<div className='flex flex-col gap-4 md:col-span-4 '>
				<span className='flex justify-between items-center'>
					<p className='text-h4 font-bold'>
						{hotelData?.pagination.total} Hotels found
						{search.destination ? ` in ${search.destination}` : ""}
					</p>

					<select
						value={sortOption}
						onChange={(event) => setSortOption(event.target.value)}
						className='border rounded-lg text-h5 focus:outline-none p-1 text-center'>
						<option value='' className=''>
							Sort by:
						</option>
						<option value='starRating'>Star Rating</option>
						<option value='pricePerNightAsc'>
							Price Per Night (low to high)
						</option>
						<option value='pricePerNightDesc'>
							Price Per Night(high to low)
						</option>
					</select>
				</span>

				{hotelData?.data.map((hotel) => (
					<SearchResultsCard hotel={hotel} />
				))}

				{/* PAGINATION */}
				{!hotelQuery.isLoading && (
					<Pagination
						page={hotelData?.pagination.page || 1}
						pages={hotelData?.pagination.pages || 1}
						onPageChange={handlePageChange}
					/>
				)}
			</div>
		</main>
	);
};

export default Search;
