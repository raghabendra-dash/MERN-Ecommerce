import Product from "./Product";
import Slider from "react-slick";
import { NextBtn, PreviousBtn } from "../Banner/Banner";
import { Link } from "react-router-dom";
import { offerProducts } from "../../../utils/constants";
import { getRandomProducts } from "../../../utils/functions";

export const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    swipe: false,
    prevArrow: <PreviousBtn />,
    nextArrow: <NextBtn />,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

const DealSlider = ({ title }) => {
    return (
        <section className="bg-white w-full shadow px-3 sm:px-6 py-0 overflow-hidden">
            <div className="pt-6">
                <div className="text-primary flex items-center gap-3">
                    <span className="w-3 h-7 bg-primary rounded-sm"></span>
                    <span className="text-sm font-bold">This Month</span>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center">
                {/* Left Side */}
                <div className="flex flex-row md:flex-col gap-3 sm:gap-6 w-full md:w-[20%] justify-between items-center">
                    <h1 className="text-lg sm:text-2xl font-medium text-center">
                        {title}
                    </h1>
                    <Link
                        to="/products"
                        className="bg-primary text-[12px] sm:text-[16px] font-medium text-white  px-2 sm:px-5 py-1.5 sm:py-2.5 rounded-full hover:shadow-md"
                    >
                        VIEW ALL
                    </Link>
                </div>

                {/* Right Side (Slider) */}
                <Slider className="w-[100%] md:w-[80%]" {...settings}>
                    {getRandomProducts(offerProducts, 12).map((item, i) => (
                        <Product {...item} key={i} />
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default DealSlider;
