import Footer from "../components/Footer";
import Header from "../components/Header";

interface Props {
	children: React.ReactNode;
}

const Layout2 = ({ children }: Props) => {
	return (
		<main className='flex flex-col min-h-screen'>
			<Header />
			<div className='bucket flex flex-col flex-1'>
				<span>{children}</span>
			</div>
			<Footer />
		</main>
	);
};

export default Layout2;
