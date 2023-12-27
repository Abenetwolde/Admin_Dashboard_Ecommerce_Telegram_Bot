import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteConfirmationModalProps,ApiResponse  } from '../types/Category';
import { deleteCategorySuccess } from '../redux/categorySlice';
import { useDispatch } from 'react-redux';
import api from '../services/api';
const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    handleClose,
    deleteItemId,
  }) => {
    const dispatch = useDispatch();
  const handleConfirmDelete = async () => {
    try {
      const response = await api.delete<ApiResponse>(
        `deleteCategory/${deleteItemId?._id}`
      );
      if (response.data.success) {
        toast.success(`${deleteItemId?.name}Category deleted successfully!`);
        dispatch(deleteCategorySuccess(deleteItemId?._id??''));
      } else {
        toast.error('Failed to delete category');
      }
      handleClose();
    } catch (error) {
      toast.error(`Error deleting category: ${error}`);
      console.error('Error deleting category:', error);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="delete-modal"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>Delete Category</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this category?</p>
      </DialogContent>
      <DialogActions>
        <div
          className="text-red-600 hover:bg-red-200 px-5 py-2 rounded-full bg-red-100 cursor-pointer"
          onClick={handleConfirmDelete}
        >
          Confirm Delete
        </div>
        <div
          onClick={handleClose}
          className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-green-100 px-5 py-2 cursor-pointer"
        >
          Cancel
        </div>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteConfirmationModal;