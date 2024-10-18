import Header from "./../components/header/Header";
import Footer from "./../components/footer/Footer";
import Routers from "../routes/Routers";

const Layout = () => {
  return (
    <main className="mx-auto max-w-[1440px]">
      <Header />
      <main className="z-100 relative mt-[70px] min-h-[60vh] w-full bg-[#f1f3f6]">
        <Routers />
      </main>
      <Footer />
    </main>
  );
};

export default Layout;
