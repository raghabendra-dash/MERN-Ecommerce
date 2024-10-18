import mobiles from "../../assets/images/Categories/phone.png";
import fashion from "../../assets/images/Categories/fashion.png";
import electronics from "../../assets/images/Categories/electronics.png";
import home from "../../assets/images/Categories/home.png";
import appliances from "../../assets/images/Categories/appliances.png";
import furniture from "../../assets/images/Categories/furniture.png";
import beauty from "../../assets/images/Categories/beauty.png";
import grocery from "../../assets/images/Categories/grocery.png";
import { Link } from "react-router-dom";

const catNav = [
  {
    name: "Mobiles",
    icon: mobiles,
  },
  {
    name: "Electronics",
    icon: electronics,
  },
  {
    name: "Fashion",
    icon: fashion,
  },
  {
    name: "Home",
    icon: home,
  },
  {
    name: "Appliances",
    icon: appliances,
  },
  {
    name: "Furniture",
    icon: furniture,
  },
  {
    name: "Beauty,Toys & more",
    icon: beauty,
  },
  {
    name: "Grocery",
    icon: grocery,
  },
];

const Categories = () => {
  return (
    <section className="w-full space-y-4 bg-white px-3 py-0 shadow sm:px-6">
      <div className="pt-6">
        <div className="flex items-center gap-3 text-primary">
          <span className="h-7 w-3 rounded-sm bg-primary"></span>
          <span className="text-sm font-bold">Categories</span>
        </div>
      </div>
      <div className="">
        <div>
          <h3 className="text-xl font-bold sm:text-2xl">Browse By Category</h3>
        </div>
        <div className="flex items-center justify-between overflow-x-auto py-2">
          {catNav.map((item, i) => (
            <Link
              to={`/products?category=${item.name}`}
              className="group flex flex-col items-center justify-between gap-1 p-3"
              key={i}
            >
              <div className="h-20 w-20">
                <img
                  className="h-full w-full rounded-xl object-contain transition-all duration-200 ease-in-out group-hover:scale-[1.05]"
                  src={item.icon}
                  alt={item.name}
                />
              </div>
              <span className="text-center text-sm font-medium text-gray-800 transition-all duration-200 ease-in-out group-hover:text-primary">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
