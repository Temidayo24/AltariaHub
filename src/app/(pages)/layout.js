import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../embla.css";

const MainLayout = ({ children }) => {
  return (
    <div className="relative">
      <Header />
      <main className="px-[35px] py-[30px] pc:px-[70px] relative">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
