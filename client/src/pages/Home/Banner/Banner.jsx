/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Banner.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import banner1 from "../../../assets/images/Banners/banner1.png";
import banner2 from "../../../assets/images/Banners/banner2.png";
import banner3 from "../../../assets/images/Banners/banner3.png";
import banner4 from "../../../assets/images/Banners/banner4.png";
import banner5 from "../../../assets/images/Banners/banner5.png";
import { Link } from "react-router-dom";

export const PreviousBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowBackIosIcon />
        </div>
    );
};

export const NextBtn = ({ className, onClick }) => {
    return (
        <div className={className} onClick={onClick}>
            <ArrowForwardIosIcon />
        </div>
    );
};

const Banner = () => {
    const settings = {
        autoplay: true,
        autoplaySpeed: 3000,
        dots: false,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: <PreviousBtn />,
        nextArrow: <NextBtn />,
    };

    const banners = [banner1, banner2, banner3, banner4, banner5];

    return (
        <>
            <section className="w-full rounded-md shadow-md p-0 overflow-hidden h-full pt-1 bg-white">
                <Slider {...settings}>
                    {banners.map((el, i) => (
                        <Link key={i} to="./products">
                            <img
                                draggable="false"
                                className="sm:h-[280px] w-full object-contain md:object-cover rounded-md px-1"
                                src={el}
                                alt="banner"
                            />
                        </Link>
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Banner;
