import { Link } from "react-router-dom";
import emptyCart from "../../../assets/images/empty-cart.png"

const EmptyCart = () => {
    return (
        <div className="flex items-center flex-col gap-2 m-6 pb-10">
            <div className="w-52 h-44">
                <img
                    draggable="false"
                    className="w-full h-full object-contain"
                    src={emptyCart}
                    alt="Empty Cart"
                />
            </div>
            <span className="text-lg">Your cart is empty!</span>
            <p className="text-sm">Add items to it now.</p>
            <Link
                to="/products"
                className="bg-primary text-base text-white px-12 py-2 rounded-sm shadow mt-3"
            >
                Shop Now
            </Link>
        </div>
    );
};

export default EmptyCart;
