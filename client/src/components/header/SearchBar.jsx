import { BsSearch } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef(null);
  const inputRef = useRef(null);

  // function to search the query
  const handleSearch = async (query) => {
    try {
      const products = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/product/search/${query}`,
      );
      setResults(products?.data?.slice(0, 6));
    } catch (error) {
      console.error("Error searching for products:", error);
    }
  };

  let timeout = useRef(null);
  const debounce = function (cb, delay) {
    return (...args) => {
      console.log("cb: ", "fn called");
      if (timeout.current) clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  };

  const debouncedSearch = debounce(handleSearch, 200);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    // Clear results if the query is empty
    if (newQuery.trim() === "") {
      setResults([]);
      return;
    }
    setOpen(true);

    // Only perform a search if the query is non-empty
    debouncedSearch(newQuery);
  };

  useEffect(() => {
    function handleClick(e) {
      // Close the dropdown only if clicked outside the input and the dialog
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setOpen(false);
        setResults([]);
      }
    }
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <div className="search-container relative flex w-full flex-col items-center sm:w-[60%]">
        <form
          action="/search"
          method=""
          className="relative w-full rounded-full bg-secondaryHover px-1"
        >
          <div className="flex h-[40px] items-center">
            <div className="group flex items-center px-1 sm:px-2">
              <button type="submit">
                <figure className="bg-transparent text-slate-500 transition-all duration-200 ease-in-out group-hover:text-black">
                  <BsSearch />
                </figure>
              </button>
            </div>
            <div className="w-full">
              <input
                ref={inputRef}
                type="text"
                placeholder="Search for Products, Brands and More"
                autoComplete="off"
                className="w-full border-none bg-transparent p-1 text-sm placeholder-gray-600 outline-none md:text-base"
                onChange={handleInputChange}
                value={query}
              />
            </div>
          </div>
        </form>
        {open && (
          <div
            ref={dialogRef}
            className="absolute left-0 right-0 top-[40px] z-50 h-fit w-full overflow-hidden rounded-b-md bg-white shadow-xl"
          >
            <ul>
              {results?.map((product) => (
                <li key={product?._id}>
                  <a
                    href={`/product/${product._id}`}
                    className="flex h-fit items-center gap-3 px-3 py-2 hover:bg-secondaryHover sm:gap-5 sm:px-5 sm:py-3"
                  >
                    <img
                      src={product?.images[0].url}
                      alt="product"
                      className="h-5 w-5"
                    />
                    <span className="text-sm sm:text-base">
                      {product?.name?.length > 40
                        ? `${product?.name?.substring(0, 40)}...`
                        : product?.name}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default SearchBar;
