import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { updateCategorySuccess } from '../redux/categorySlice';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { EditProdcutModalProps ,UpdateProductResponse} from '../../types/product';
import { updateProductSuccess } from '../../redux/productSlice';

const EditProdcut: React.FC<EditProdcutModalProps> = ({ isOpen, handleClose, editedRow, setEditedRow }) => {
    const dispatch = useDispatch();
    const handleUpdate = async () => {
        try {
            // Make an API request to update the category by its ID
            const response = await api.put<UpdateProductResponse, any>(`product/updateproductbyid/${editedRow?._id}`, {
                ...editedRow
                // Add other properties as needed
            });
            if (response.data.success) {
                dispatch(updateProductSuccess(response.data.product))

                toast.success("Prodcut Update successfully!");
                // window.location.reload();

            } else {
                toast.error("Failed to Update Prodcut");
            }
            // Close the modal and update the data as needed
            handleClose();
        } catch (error) {
            toast.error(`Error updating Prodcut:', ${error}`);
            console.error('Error updating category:', error);
            // Handle errors or display a message to the user
        }
    };
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="edit-modal" fullWidth maxWidth="sm">
            <DialogTitle>Edit Row</DialogTitle>
            <DialogContent>
                {/* Populate modal with input fields based on the columns' data */}
                {editedRow && (
                    <div>
                        <p>Name</p>
                        <TextField
                            value={editedRow.name}
                            onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, name: e.target.value } : null))}
                            fullWidth
                            margin="dense"
                        />
                        <p>Discription</p>
                        <TextField
                            value={editedRow.description}
                            onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, icon: e.target.value } : null))}
                            fullWidth
                            margin="dense"
                        />
                        <p>Price</p>
                        <TextField
                            value={editedRow.price}
                            onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, icon: e.target.value } : null))}
                            fullWidth
                            margin="dense"
                        />
                        <p>Price</p>
                        <TextField
                            value={editedRow.available}
                            onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, icon: e.target.value } : null))}
                            fullWidth
                            margin="dense"
                        />
                        <p>Quantity</p>
                        <TextField
                            value={editedRow.cookTime}
                            onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, icon: e.target.value } : null))}
                            fullWidth
                            margin="dense"
                        />
                    </div>
                )}
            </DialogContent>
            <DialogActions>
                <div
                    className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-green-100 px-5 py-2 cursor-pointer"
                    onClick={handleUpdate}
                >
                    Update
                </div>
                <div
                    onClick={handleClose}
                    className="text-red-600 hover:bg-red-200 px-5 py-2 rounded-full bg-red-100 cursor-pointer"
                >
                    Cancel
                </div>
            </DialogActions>
        </Dialog>
    );
}
export default EditProdcut;



