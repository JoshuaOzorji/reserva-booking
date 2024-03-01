import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Layout2 from "./layouts/Layout2";
import SignIn from "./pages/SignIn";
import { useAppContext } from "./contexts/AppContext";
import AddHotel from "./pages/AddHotel";
import MyHotels from "./pages/MyHotels";
import EditHotel from "./pages/EditHotel";
import Search from "./pages/Search";
import Detail from "./pages/Detail";
import Booking from "./pages/Booking";

const App = () => {
	const { isLoggedIn } = useAppContext();

	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={
						<Layout>
							<Homepage />
						</Layout>
					}
				/>

				<Route
					path='/search'
					element={
						<Layout2>
							<Search />
						</Layout2>
					}
				/>

				<Route
					path='/detail/:hotelId'
					element={
						<Layout2>
							<Detail />
						</Layout2>
					}
				/>

				<Route
					path='/register'
					element={
						<Layout2>
							<Register />
						</Layout2>
					}
				/>

				<Route
					path='/sign-in'
					element={
						<Layout2>
							<SignIn />
						</Layout2>
					}
				/>
				{isLoggedIn && (
					<>
						<Route
							path='/hotel/:hotelId/booking'
							element={
								<Layout2>
									<Booking />
								</Layout2>
							}
						/>

						<Route
							path='/add-hotel'
							element={
								<Layout2>
									<AddHotel />
								</Layout2>
							}
						/>

						<Route
							path='/my-hotels'
							element={
								<Layout2>
									<MyHotels />
								</Layout2>
							}
						/>

						<Route
							path='/edit-hotel/:hotelId'
							element={
								<Layout2>
									<EditHotel />
								</Layout2>
							}
						/>
					</>
				)}
				<Route path='*' element={<Navigate to='/' />} />
			</Routes>
		</Router>
	);
};

export default App;
