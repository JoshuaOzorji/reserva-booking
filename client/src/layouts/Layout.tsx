import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";

interface Props {
	children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
	return (
		<main className='flex flex-col min-h-screen'>
			<Header />
			<Hero />
			<div className='bucket flex flex-col flex-1'>
				<SearchBar />
				<span>{children}</span>
			</div>
			<Contact />
			<Footer />
		</main>
	);
};

export default Layout;
