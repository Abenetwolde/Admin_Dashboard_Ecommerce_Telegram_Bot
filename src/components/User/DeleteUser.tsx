import React from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DeleteProductResponse ,DeleteConfirmationProdcutModalProps} from '../../types/product';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { DeleteUserProps } from '../../types/User/user';
import { useDeleteUserMutation } from '../../redux/Api/User';

const DeleteUser: React.FC<DeleteUserProps> = ({
    isOpen,
    handleClose,
    deletedItem,
  }) => {
    const [deleteUser,{isLoading}]=useDeleteUserMutation()
  const handleConfirmDelete = async () => {
    try {
      const {success}:any = await deleteUser(deletedItem._id).unwrap();
      if (success) {
        toast.success(`${deletedItem?.first_name} User deleted successfully!`);
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
      <Button
          variant="contained"
          color="secondary"
          onClick={handleConfirmDelete}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress size={20} />}
        >
          {isLoading ? 'Deleting...' : 'Confirm Delete'}
        </Button>
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteUser;