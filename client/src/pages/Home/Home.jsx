import ScrollToTopOnRouteChange from "../../utils/ScrollToTopOnRouteChange";
import Categories from "../../components/header/Categories";
import Banner from "./Banner/Banner";
import DealSlider from "./DealSlider/DealSlider";
import ProductSlider from "./ProductsListing/ProductSlider";
import { electronicProducts } from "../../utils/electronics";
import { accessories } from "../../utils/accessories";
import { fashionProducts } from "../../utils/fashion";
import { applianceProducts } from "../../utils/appliances";
import { furnitureProducts } from "../../utils/furniture";
import electronics from "../../assets/images/electronics-card.jpg";
import accessoryCard from "../../assets/images/accessory-card.jpg";
import fashionCard from "../../assets/images/fashion-card.jpg";
import applianceCard from "../../assets/images/appliance-card.jpg";
import furnitureCard from "../../assets/images/furniture-card.jpg";
import Suggestion from "./Suggestions/Suggestion";
import SeoData from "../../SEO/SeoData";
import { useState } from "react";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const [isInfoMessageVisible, setIsInfoMessageVisible] = useState(true);
  return (
    <>
      <SeoData title="Online Shopping Site for Mobiles, Electronics, Furniture, Grocery, Lifestyle, Books & More. Best Offers!" />
      <ScrollToTopOnRouteChange />
      <main className="flex flex-col items-center gap-3 px-2 py-3">
        {isInfoMessageVisible && (
          <div className="flex w-full items-start justify-between gap-5 rounded-md bg-primary p-2 text-[10px] text-white md:text-sm">
            <p>
              Backend Initialization: Please wait a moment while the server
              starts up. If the loading indicator persists, it may take a minute
              to start.
            </p>
            <span
              className="cursor-pointer hover:scale-[1.05]"
              onClick={() => setIsInfoMessageVisible(false)}
            >
              <IoClose className="h-5 w-5" />
            </span>
          </div>
        )}
        <Banner />
        <Categories />

        <DealSlider title={"Best Selling Products"} />
        <ProductSlider
          title={"Best of Electronics"}
          products={electronicProducts}
          logo={electronics}
        />
        <ProductSlider
          title={"Beauty, Toys & More"}
          products={accessories}
          logo={accessoryCard}
        />
        <Suggestion
          title={"Suggested for You"}
          tagline={"Based on Your Activity"}
        />

        <ProductSlider
          title={"Fashion Top Deals"}
          products={fashionProducts}
          logo={fashionCard}
        />
        <ProductSlider
          title={"TVs & Appliances"}
          products={applianceProducts}
          logo={applianceCard}
        />
        <ProductSlider
          title={"Furniture & More"}
          products={furnitureProducts}
          logo={furnitureCard}
        />
      </main>
    </>
  );
};

export default Home;
