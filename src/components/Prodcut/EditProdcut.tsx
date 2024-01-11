import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { updateCategorySuccess } from '../redux/categorySlice';
import { useDispatch } from 'react-redux';
import api from '../../services/api';
import { EditProdcutModalProps, UpdateProductResponse } from '../../types/product';
import { updateProductSuccess } from '../../redux/productSlice';
import { useEffect, useState } from 'react';

const EditProdcut: React.FC<EditProdcutModalProps> = ({ isOpen, handleClose, editedRow, setEditedRow }) => {
    const dispatch = useDispatch();

    const editImageUrl = editedRow?.images
    const [editImage, seteditImage] = useState(editImageUrl);
    console.log("edited image", editImageUrl)
    const [selectedImages, setSelectedImages] = useState<any>([]);
    const [uploadedImages, setUploadedImages] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = e.target.files;
            setUploadedImages([]);
            if (files.length > 0) {
                const newImages = Array.from(files).map((file) => ({
                    file,
                    preview: URL.createObjectURL(file),
                }));
                setSelectedImages(newImages);
                // Clear previously selected images from the state
                setUploadedImages([]);
                // Here, we use setEditedRow to update the images in the editedRow state
                setEditedRow((prev) => (prev ? { ...prev, images: [] } : null));
            }
        }
    };
    useEffect(() => {
        seteditImage(editedRow?.images)
    }, [editImage]);
    const handleUpload = async () => {
        if (selectedImages.length > 0) {
            setLoading(true);
            const formData = new FormData();
            for (let i = 0; i < selectedImages.length; i++) {
                formData.append('images', selectedImages[i].file);
            }

            try {
                const response = await api.post('product/upload', formData);
                console.log('Images uploaded successfully!', response.data.fileUrls);

                // Update editImage state with uploaded images
                seteditImage(response.data.fileUrls);

                // Update editedRow state with uploaded images
                setEditedRow((prev) => (prev ? { ...prev, images: response.data.fileUrls } : null));

                setUploadedImages(response.data.fileUrls);

                toast.success('Images uploaded successfully!');
            } catch (error) {
                console.error('Error uploading images:', error);
                toast.error('Error uploading images');
            } finally {
                setLoading(false);
            }
        }
    };
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
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="edit-modal" fullWidth maxWidth="lg">
            <DialogTitle>Edit Row</DialogTitle>
            <DialogContent>
                {/* Populate modal with input fields based on the columns' data */}
                {editedRow && (
                    <div className="grid grid-cols-2 gap-4 flex-1">
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
                        <div>
                            <p>Name</p>
                            <TextField
                                value={editedRow?.images}
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
                            <div className="flex flex-col gap-2 m-2 ">
                                <h2 className="font-medium">Product Images</h2>
                                <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                    {editedRow?.images?.length > 0 ? (
                                        editedRow?.images?.map((imageUrl, index) => (
                                            <img key={index} src={`http://localhost:8000${imageUrl}`} alt={`Uploaded ${index}`} />
                                        ))
                                    ) : (
                                        <div className="flex gap-2 overflow-x-auto h-32 border rounded">
                                            {selectedImages.map((file, index) => (
                                                <img key={index} src={file.preview} alt={`Selected ${index}`} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {loading && <div>Loading...</div>}
                                <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white p-2 shadow hover:shadow-lg my-2 sm:w-1/2">
                                    <input
                                        type="file"
                                        name="images"
                                        accept="image/*"
                                        multiple
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    Choose Files
                                </label>
                                <button type="button" onClick={handleUpload}>
                                    Upload Images
                                </button>


                            </div>
                        </div>
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



