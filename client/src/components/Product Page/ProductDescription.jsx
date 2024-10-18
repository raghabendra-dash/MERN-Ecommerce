/* eslint-disable react/prop-types */
import StarIcon from "@mui/icons-material/Star";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import CachedIcon from "@mui/icons-material/Cached";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { getDeliveryDate, getDiscount } from "../../utils/functions";
import { useState } from "react";
import { Link } from "react-router-dom";
import { triggerCustomToast } from "../Toast/CustomToast";

const ProductDescription = ({ product, productId }) => {
  const [open, setOpen] = useState(false);
  const [viewAll, setViewAll] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleDialogClose = () => {
    setOpen(!open);
  };

  const reviewSubmitHandler = () => {
    if (rating === 0 || !comment.trim()) {
      triggerCustomToast("error", "Empty Review!");
      return;
    }
    const formData = new FormData();
    formData.set("rating", rating);
    formData.set("comment", comment);
    formData.set("productId", productId);

    setOpen(false);
  };
  return (
    <div className="w-full px-3 py-2 lg:flex-1">
      {/* <!-- whole product description --> */}
      <div className="mb-4 flex flex-col gap-3">
        <h2 className="text-lg sm:text-xl">{product?.name}</h2>
        {/* <!-- rating badge --> */}
        <span className="text-md flex items-center gap-2 font-medium text-gray-500">
          <span className="flex items-center gap-0.5 rounded-sm bg-primaryGreen px-1.5 py-0.5 text-xs text-white">
            {product?.ratings?.toFixed(1)}
            <StarIcon sx={{ fontSize: "12px" }} />
          </span>
          <span>{product?.numOfReviews} Reviews</span>
        </span>
        {/* <!-- rating badge --> */}

        {/* <!-- price desc --> */}
        <div className="flex flex-col text-3xl">
          <span className="text-sm font-medium text-primaryGreen">
            Special Price
          </span>
          <div className="flex items-baseline gap-2 text-3xl font-medium">
            <span className="text-gray-800">
              ₹{product?.discountPrice?.toLocaleString()}
            </span>
            <span className="text-base text-gray-500 line-through">
              ₹{product?.price?.toLocaleString()}
            </span>
            <span className="text-base text-primaryGreen">
              {getDiscount(product?.price, product?.discountPrice)}
              %&nbsp;off
            </span>
          </div>
        </div>
        {product?.stock <= 10 && product?.stock > 0 && (
          <span className="text-sm font-medium text-red-500">
            Hurry, Only {product.stock} left!
          </span>
        )}
        {/* <!-- price desc --> */}

        {/* <!-- banks offers --> */}
        <p className="text-md font-[600]">Available offers</p>

        {[
          "Flat ₹200 off on HDFC Bank Credit/Debit Card on 3 months EMI Txns, Min Txn Value ₹10,000",
          "10% Instant Discount on ICICI Bank Credit Card Txns, up to ₹1250, on orders of ₹5000 and above",
          "Flat ₹500 off on HDFC Bank Credit/Debit Card on 6 months EMI Txns, Min Txn Value ₹10,000",
        ].map((el, i) => (
          <div className="flex gap-2 text-xs leading-4 sm:text-sm" key={i}>
            <div className="flex items-start whitespace-nowrap">
              <LocalOfferIcon
                sx={{
                  fontSize: "16px",
                }}
                style={{
                  color: "#16bd49",
                  marginTop: "2px",
                }}
              />
              <span className="ml-1 font-semibold">Bank Offer</span>
            </div>
            <div className="flex items-start text-sm">
              <span>
                {el}
                <Link
                  className="ml-1 text-[12px] font-medium text-primary"
                  to="./"
                >
                  T&C
                </Link>
              </span>
            </div>
          </div>
        ))}
        {/* <!-- banks offers --> */}

        {/* <!-- warranty & brand --> */}
        <div className="mt-2 flex items-center gap-8 text-sm">
          <img
            draggable="false"
            className="h-8 w-20 border object-contain p-0.5"
            src={product.brand?.logo.url}
            alt={product?.brand?.name}
          />
          <span>
            {product?.warranty === 0
              ? "No Warranty"
              : `${product?.warranty} Year Brand Warranty`}
          </span>
          <Link className="-ml-5 font-medium text-primary" to="/">
            Know More
          </Link>
        </div>
        {/* <!-- warranty & brand --> */}

        {/* <!-- delivery details --> */}
        <div className="mt-4 flex items-center gap-16 text-sm font-medium">
          <p className="text-gray-500">Delivery</p>
          <span>Delivery by {getDeliveryDate()} | ₹ 40</span>
        </div>
        {/* <!-- delivery details --> */}

        {/* <!-- highlights & services details --> */}
        <div className="flex flex-col justify-between sm:flex-row">
          {/* <!-- highlights details --> */}
          <div className="mt-4 flex items-stretch gap-16 text-sm">
            <p className="font-medium text-gray-500">Highlights</p>

            <ul className="flex w-64 list-disc flex-col gap-2">
              {product?.highlights.length == 0 ? (
                <div>NA</div>
              ) : (
                product?.highlights?.map((highlight, i) => (
                  <li key={i}>
                    <p>{highlight}</p>
                  </li>
                ))
              )}
            </ul>
          </div>
          {/* <!-- highlights details --> */}

          {/* <!-- services details --> */}
          <div className="mr-6 mt-4 flex items-stretch gap-16 text-sm">
            <p className="font-medium text-gray-500">Services</p>
            <ul className="flex flex-col gap-2">
              <li>
                <p className="flex items-center gap-3">
                  <span className="text-primary">
                    <VerifiedUserIcon
                      sx={{
                        fontSize: "18px",
                      }}
                    />
                  </span>{" "}
                  {product?.warranty} Year Brand Warranty
                </p>
              </li>
              <li>
                <p className="flex items-center gap-3">
                  <span className="text-primary">
                    <CachedIcon
                      sx={{
                        fontSize: "18px",
                      }}
                    />
                  </span>{" "}
                  7 Days Replacement Policy
                </p>
              </li>
              <li>
                <p className="flex items-center gap-3">
                  <span className="text-primary">
                    <CurrencyRupeeIcon
                      sx={{
                        fontSize: "18px",
                      }}
                    />
                  </span>{" "}
                  Cash on Delivery available
                </p>
              </li>
            </ul>
          </div>
          {/* <!-- services details --> */}
        </div>
        {/* <!-- highlights & services details --> */}

        {/* <!-- seller details --> */}
        <div className="mt-4 flex items-center gap-16 text-sm font-medium">
          <p className="text-gray-500">Seller</p>
          <Link className="ml-3 font-medium text-primary" to="/">
            {product?.brand?.name}
          </Link>
        </div>
        {/* <!-- seller details --> */}

        {/* <!-- description details --> */}
        <div className="mt-4 flex flex-col items-stretch gap-1 text-sm sm:flex-row sm:gap-14">
          <p className="font-medium text-gray-500">Description</p>
          <span>{product?.description}</span>
        </div>
        {/* <!-- description details --> */}

        {/* <!-- specifications border box --> */}
        <div className="mt-4 flex w-full flex-col rounded-sm border pb-4">
          <h1 className="border-b px-6 py-4 text-2xl font-[600]">
            Specifications
          </h1>
          <h1 className="px-6 py-3 text-lg">General</h1>

          {/* <!-- specs list --> */}
          {product?.specifications?.map((spec, i) => (
            <div
              className="flex items-center justify-between gap-10 px-6 py-2 text-sm"
              key={i}
            >
              <p className="w-3/12 text-gray-500">{spec.title}</p>
              <p className="flex-1">{spec.description}</p>
            </div>
          ))}
          {/* <!-- specs list --> */}
        </div>
        {/* <!-- specifications border box --> */}

        {/* <!-- reviews border box --> */}
        <div className="mt-4 flex w-full flex-col rounded-sm border">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h1 className="text-2xl font-medium">Ratings & Reviews</h1>
            <button
              onClick={handleDialogClose}
              className="rounded-sm border bg-white px-4 py-2 font-[500] shadow hover:shadow-md"
            >
              Rate Product
            </button>
          </div>

          <Dialog
            aria-labelledby="review-dialog"
            open={open}
            onClose={handleDialogClose}
          >
            <DialogTitle className="border-b">Submit Review</DialogTitle>
            <DialogContent className="m-1 flex flex-col gap-4">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                precision={0.5}
              />
              <TextField
                label="Review"
                multiline
                rows={3}
                sx={{ width: 400 }}
                size="small"
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <button
                onClick={handleDialogClose}
                className="rounded border border-red-500 bg-white px-6 py-2 uppercase text-red-600 shadow hover:bg-red-100"
              >
                Cancel
              </button>
              <button
                onClick={reviewSubmitHandler}
                className="rounded bg-[#FB641B] px-6 py-2 uppercase text-white shadow hover:bg-[#ff7f54]"
              >
                Submit
              </button>
            </DialogActions>
          </Dialog>

          <div className="flex items-center border-b">
            <h1 className="px-6 py-3 text-3xl font-semibold">
              {product?.ratings?.toFixed(1)} <StarIcon />
            </h1>
            <p className="text-lg text-gray-500">
              ({product?.numOfReviews}) Reviews
            </p>
          </div>

          {viewAll
            ? product?.reviews
                ?.map((rev, i) => (
                  <div
                    className="flex flex-col gap-2 border-b px-6 py-4"
                    key={i}
                  >
                    <Rating
                      name="read-only"
                      value={rev.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                    <p>{rev.comment}</p>
                    <span className="text-sm text-gray-500">by {rev.name}</span>
                  </div>
                ))
                .reverse()
            : product.reviews
                ?.slice(-3)
                .map((rev, i) => (
                  <div
                    className="flex flex-col gap-2 border-b px-6 py-4"
                    key={i}
                  >
                    <Rating
                      name="read-only"
                      value={rev.rating}
                      readOnly
                      size="small"
                      precision={0.5}
                    />
                    <p>{rev.comment}</p>
                    <span className="text-sm text-gray-500">by {rev.name}</span>
                  </div>
                ))
                .reverse()}
          {product.reviews?.length > 3 && (
            <button
              onClick={() => setViewAll(!viewAll)}
              className="bg-primary-blue m-2 w-1/3 rounded-sm py-2 text-white shadow hover:shadow-lg"
            >
              {viewAll ? "View Less" : "View All"}
            </button>
          )}
        </div>
        {/* <!-- reviews border box --> */}
      </div>
    </div>
  );
};

export default ProductDescription;
