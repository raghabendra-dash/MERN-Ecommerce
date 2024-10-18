import TextField from "@mui/material/TextField";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import ImageIcon from "@mui/icons-material/Image";
import { categories } from "../../utils/constants";
import Spinner from "../../components/Spinner";
import axios from "axios";
import FormData from "form-data";
import { useAuth } from "../../context/auth";
import ScrollToTopOnRouteChange from "./../../utils/ScrollToTopOnRouteChange";
import SeoData from "../../SEO/SeoData";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const CreateProduct = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [highlights, setHighlights] = useState([]);
  const [highlightInput, setHighlightInput] = useState("");
  const [specs, setSpecs] = useState([]);
  const [specsInput, setSpecsInput] = useState({
    title: "",
    description: "",
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState();
  const [warranty, setWarranty] = useState();
  const [brand, setBrand] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [logo, setLogo] = useState("");
  const [logoPreview, setLogoPreview] = useState("");

  //for submit state
  const [isSubmit, setIsSubmit] = useState(false);

  // max image size 500kb
  const MAX_IMAGE_SIZE = 500 * 1024;
  const MAX_IMAGES_COUNT = 4; // Maximum number of allowed images

  const handleSpecsChange = (e) => {
    setSpecsInput({ ...specsInput, [e.target.name]: e.target.value });
  };

  const addSpecs = () => {
    if (!specsInput.title.trim() && !specsInput.description.trim()) return;
    setSpecs([...specs, specsInput]);
    setSpecsInput({ title: "", description: "" });
  };

  const addHighlight = () => {
    if (!highlightInput.trim()) return;
    setHighlights([...highlights, highlightInput]);
    setHighlightInput("");
  };

  const deleteHighlight = (index) => {
    setHighlights(highlights.filter((h, i) => i !== index));
  };

  const deleteSpec = (index) => {
    setSpecs(specs.filter((s, i) => i !== index));
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];

    if (file.size > MAX_IMAGE_SIZE) {
      triggerCustomToast("warning", "Logo image size exceeds 500 KB!");
      return;
    }
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setLogoPreview(reader.result);
        setLogo(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleProductImageChange = (e) => {
    const files = Array.from(e.target.files);
    // if more than 4 images then show warning
    if (files.length > MAX_IMAGES_COUNT) {
      triggerCustomToast("warning", "You can only upload up to 4 images");
      return;
    }

    files.forEach((file) => {
      // check for image size
      if (file.size > MAX_IMAGE_SIZE) {
        triggerCustomToast(
          "warning",
          "One of the product images exceeds 500 KB",
        );
        // Skip the file if it exceeds the size limit
        return;
      }
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((oldImages) => [...oldImages, reader.result]);
          setImages((oldImages) => [...oldImages, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const newProductSubmitHandler = async (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsSubmit(true);
    try {
      // required field checks
      if (!logo) {
        triggerCustomToast("warning", "Please Add Brand Logo");
        return;
      }
      if (specs.length <= 1) {
        triggerCustomToast("warning", "Please Add Minimum 2 Specifications");
        return;
      }
      if (images.length <= 0) {
        triggerCustomToast("warning", "Please Add Product Images");
        return;
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discountPrice", discountPrice);
      formData.append("category", category);
      formData.append("stock", stock);
      formData.append("warranty", warranty);
      formData.append("brandName", brand);
      formData.append("logo", logo);

      images.forEach((image) => {
        formData.append("images", image);
      });

      highlights.forEach((h) => {
        formData.append("highlights", h);
      });

      specs.forEach((s) => {
        formData.append("specifications", JSON.stringify(s));
      });
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/product/new-product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth?.token,
          },
        },
      );
      // on success->
      response.status === 201 &&
        triggerCustomToast("success", "Product Added Successfully!");
      navigate("/admin/dashboard/all-products");
    } catch (error) {
      console.error("Error:", error);
      setIsSubmit(false);
      //server error
      error.response.status === 500 &&
        triggerCustomToast(
          "error",
          "Something went wrong! Please try after sometime.",
        );
    }
  };

  return (
    <>
      <SeoData title="New Product | BuzzBuy" />
      <ScrollToTopOnRouteChange />

      {isSubmit ? (
        <div className="relative h-full">
          <Spinner />
        </div>
      ) : (
        <form
          onSubmit={newProductSubmitHandler}
          encType="multipart/form-data"
          className="flex w-full flex-col rounded-lg bg-white p-4 shadow sm:flex-row"
          id="mainForm"
        >
          <div className="m-2 mx-auto flex w-[90%] flex-col gap-3 py-2">
            <TextField
              label="Name"
              variant="outlined"
              size="small"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Description"
              multiline
              rows={2}
              required
              variant="outlined"
              size="small"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-between gap-2">
              <TextField
                label="Price"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Discount Price"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                value={discountPrice}
                onChange={(e) => setDiscountPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-between gap-4">
              <TextField
                label="Category"
                select
                fullWidth
                variant="outlined"
                size="small"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((el, i) => (
                  <MenuItem value={el} key={i}>
                    {el}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Stock"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              <TextField
                label="Warranty"
                type="number"
                variant="outlined"
                size="small"
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                required
                value={warranty}
                onChange={(e) => setWarranty(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded border">
                <input
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  type="text"
                  placeholder="Highlight"
                  className="flex-1 border-none px-2 outline-none"
                />
                <span
                  onClick={() => addHighlight()}
                  className="cursor-pointer rounded-r bg-primaryBlue px-6 py-2 text-white hover:shadow-lg"
                >
                  Add
                </span>
              </div>

              <div className="flex flex-col gap-1.5">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded bg-green-50 px-2 py-1"
                  >
                    <p className="text-sm font-medium text-green-800">{h}</p>
                    <span
                      onClick={() => deleteHighlight(i)}
                      className="cursor-pointer rounded-full p-1 text-red-600 hover:bg-red-100"
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <h2 className="font-medium">Brand Details</h2>
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
              <TextField
                label="Brand"
                type="text"
                variant="outlined"
                size="small"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              <div className="relative flex h-10 w-24 items-center justify-center rounded-lg border">
                {!logoPreview ? (
                  <ImageIcon />
                ) : (
                  <img
                    draggable="false"
                    src={logoPreview}
                    alt="Brand Logo"
                    className="h-full w-full object-contain"
                  />
                )}
                <span className="absolute -right-[90px] -top-1 text-red-500">
                  *
                  <span className="text-[10px] text-gray-500">(max 500KB)</span>
                </span>
              </div>
              <label className="cursor-pointer rounded bg-primaryBlue px-2.5 py-2 text-center text-white shadow hover:shadow-lg">
                <input
                  type="file"
                  name="logo"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                Choose Logo
              </label>
            </div>

            <h2 className="font-medium">
              Specifications{" "}
              <span className="text-xs text-gray-500">
                (at least 2 required)
              </span>
            </h2>

            <div className="flex items-center justify-between gap-2">
              <TextField
                value={specsInput.title}
                onChange={handleSpecsChange}
                name="title"
                label="Name"
                placeholder="Model No."
                variant="outlined"
                size="small"
              />
              <TextField
                value={specsInput.description}
                onChange={handleSpecsChange}
                name="description"
                label="Description"
                placeholder="WJDK42DF5"
                variant="outlined"
                size="small"
              />
              <span
                onClick={() => addSpecs()}
                className="cursor-pointer rounded bg-primaryBlue px-6 py-2 text-white hover:shadow-lg"
              >
                Add
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {specs.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-2 rounded bg-blue-50 px-2 py-1 text-sm sm:gap-5"
                >
                  <p className="font-medium text-gray-500">{spec.title}</p>
                  <p>{spec.description}</p>
                  <span
                    onClick={() => deleteSpec(i)}
                    className="cursor-pointer rounded-full bg-red-100 p-1 text-red-600 hover:bg-red-200"
                  >
                    <DeleteIcon />
                  </span>
                </div>
              ))}
            </div>

            <h2 className="font-medium">
              Product Images{" "}
              <span className="ml-2 text-xs text-gray-500">
                (1-4 images, max 500KB each)
              </span>
            </h2>
            <div className="flex h-32 gap-2 overflow-x-auto rounded border">
              {imagesPreview.map((image, i) => (
                <img
                  draggable="false"
                  src={image}
                  alt="Product"
                  key={i}
                  className="h-full w-full object-contain"
                />
              ))}
            </div>
            <label className="my-2 cursor-pointer rounded bg-primaryBlue p-2 text-center font-medium text-white shadow hover:shadow-lg">
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleProductImageChange}
                className="hidden"
              />
              Choose Files
            </label>

            <div className="flex justify-end">
              <input
                form="mainForm"
                type="submit"
                className="w-full cursor-pointer rounded bg-primary p-3 font-medium uppercase text-white shadow hover:shadow-lg"
                value="Submit"
              />
            </div>
          </div>
        </form>
      )}
    </>
  );
};
export default CreateProduct;
