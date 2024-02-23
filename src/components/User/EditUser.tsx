import { Autocomplete, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// import { updateCategorySuccess } from '../redux/categorySlice';
import { useDispatch } from 'react-redux';
import api from '../../services/api';

import { EditUserProps } from '../../types/User/user';
import { updateUserSuccess } from '../../redux/userSlice';

const EditUser: React.FC<EditUserProps> = ({ isOpen, handleClose, editedRow, setEditedRow }) => {
    const dispatch = useDispatch();

    const handleUpdate = async () => {
        try {
            const isBot = editedRow.is_bot === 'true';

            // Make an API request to update the user by its ID
            const response = await api.put<EditUserProps, any>(`user/updateuser/${editedRow?.telegramid}`, {
                ...editedRow,
                is_bot: isBot,
            });
            console.log(response.data)
            console.log(editedRow)
            if (response.data.success) {
                dispatch(updateUserSuccess(response.data.user))

                toast.success("User Update successfully!");
                // window.location.reload();

            } else {
                toast.error("Failed to Update User");
            }
            // Close the modal and update the data as needed
            handleClose();
        } catch (error) {
            toast.error(`Error updating User:', ${error}`);

            // Handle errors or display a message to the user
        }
    };
    return (
        <Dialog open={isOpen} onClose={handleClose} aria-labelledby="edit-modal" fullWidth >
            <DialogTitle>Edit Row</DialogTitle>
            <DialogContent>
                {/* Populate modal with input fields based on the columns' data */}
                {editedRow && (
                    <div className="gap-4 flex-1">
                        <div>
                            <p>Telegram ID</p>
                            <TextField
                                value={editedRow.telegramid}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, telegramid: e.target.value } : null))}
                                fullWidth
                                margin="dense"
                            />
                            <p>First Name</p>
                            <TextField
                                value={editedRow.first_name}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, first_name: e.target.value } : null))}
                                fullWidth
                                margin="dense"
                            />
                            <p>Last Name</p>
                            <TextField
                                value={editedRow.last_name}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, last_name: e.target.value } : null))}
                                fullWidth
                                margin="dense"
                            />
                            <p>User Name</p>
                            <TextField
                                value={editedRow.username}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, username: e.target.value } : null))}
                                fullWidth
                                margin="dense"
                            />
                            <p>Language</p>
                            <TextField
                                value={editedRow.language}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, language: e.target.value } : null))}
                                fullWidth
                                margin="dense"
                            />
                            <p>Is Bot</p>
                            <select
                                value={editedRow.is_bot}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, is_bot: e.target.value } : null))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            <p>Registerd From</p>
                            <select
                              value={editedRow?.from || "BOT"}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, from: e.target.value } : null))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                
                                <option value="BOT">BOT</option>
                                <option value="CHANNEL">CHANNEL</option>
                              
                            </select>
                            <p>Role</p>
                            <select
                              value={editedRow?.role || "USER"}
                                onChange={(e) => setEditedRow((prev) => (prev ? { ...prev, role: e.target.value } : null))}
                                className="w-full p-2 border border-gray-300 rounded-md"
                            >
                                
                                <option value="ADMIN">ADMIN</option>
                                <option value="SUPER ADMIN">SUPER ADMIN</option>
                                <option value="USER">USER</option>
                            </select>
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
export default EditUser;



