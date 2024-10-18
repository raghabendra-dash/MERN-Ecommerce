/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { triggerCustomToast } from "../../components/Toast/CustomToast";

const Actions = ({ id, name, updateDeletedProduct }) => {
  const [open, setOpen] = useState(false);
  const { auth } = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const deleteHandler = async (id) => {
    handleClose();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/product/delete-product`,
        {
          productId: id,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: auth?.token,
          },
        },
      );
      if (res.status === 201) {
        triggerCustomToast("success", "Product Deleted Successfully!");
        // After a successful deletion, update the products state
        updateDeletedProduct(id);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.res?.status === 401) {
        triggerCustomToast("error", "Product Not Found!");
      } else if (error.res?.status === 500) {
        triggerCustomToast(
          "error",
          "Something Went Wrong! Please Try Again Later",
        );
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <Link
          to={`/admin/dashboard/product/${id}`}
          className="rounded-full bg-blue-100 p-[1px] text-blue-600 hover:bg-blue-200"
        >
          <EditIcon />
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="rounded-full bg-red-100 p-[1px] text-primary hover:bg-red-200"
        >
          <DeleteIcon />
        </button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <p className="text-gray-500">
            Do you really want to delete
            {name && <span className="font-medium">&nbsp;{name}</span>}?
          </p>
        </DialogContent>
        <DialogActions>
          <button
            onClick={handleClose}
            className="rounded bg-gray-400 px-6 py-2 text-white shadow hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={() => deleteHandler(id)}
            className="ml-4 rounded bg-red-600 px-6 py-2 text-white shadow hover:bg-red-700"
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Actions;
