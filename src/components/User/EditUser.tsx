import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Grid
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
// import { updateUserSuccess } from '../../redux/userSlice';
// import { useUpdateUserMutation } from '../../redux/Api/userApi';
import { EditUserProps } from '../../types/User/user';
import { useUpdateUserMutation } from '../../redux/Api/User';

const EditUser: React.FC<EditUserProps> = ({ isOpen, handleClose, editedRow, setEditedRow }) => {
  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const [localEditedRow, setLocalEditedRow] = useState(editedRow);

  useEffect(() => {
    setLocalEditedRow(editedRow);
  }, [editedRow]);

  const handleUpdate = async () => {
    try {
      const isBot = localEditedRow.is_bot === 'true';
      const updatedUser:any = { ...localEditedRow, is_bot: isBot };
      const response:any = await updateUser(updatedUser).unwrap();

      if (response.success) {
        toast.success('User updated successfully!');
        handleClose();
      } else {
        toast.error('Failed to update user');
      }
    } catch (error) {
      toast.error(`Error updating user: ${error}`);
    }
  };

  const handleChange = (field: string, value: any) => {
    setLocalEditedRow(prev => (prev ? { ...prev, [field]: value } : null));
  };

  return (
    <Dialog open={isOpen} maxWidth="md" onClose={handleClose} aria-labelledby="edit-modal" >
    <DialogTitle>Edit User</DialogTitle>
    <DialogContent>
      {localEditedRow && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Telegram ID"
              value={localEditedRow.telegramid}
              onChange={(e) => handleChange('telegramid', e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="First Name"
              value={localEditedRow.first_name}
              onChange={(e) => handleChange('first_name', e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Last Name"
              value={localEditedRow.last_name}
              onChange={(e) => handleChange('last_name', e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Username"
              value={localEditedRow.username}
              onChange={(e) => handleChange('username', e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Language"
              value={localEditedRow.language}
              onChange={(e) => handleChange('language', e.target.value)}
              fullWidth
              margin="dense"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Is Bot</InputLabel>
              <Select
                value={localEditedRow.is_bot}
                onChange={(e) => handleChange('is_bot', e.target.value)}
              >
                <MenuItem value="true">True</MenuItem>
                <MenuItem value="false">False</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Registered From</InputLabel>
              <Select
                value={localEditedRow.from || 'BOT'}
                onChange={(e) => handleChange('from', e.target.value)}
              >
                <MenuItem value="Bot">Bot</MenuItem>
                <MenuItem value="Channel">Channel</MenuItem>
                <MenuItem value="Refferal">Refferal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="dense">
              <InputLabel>Role</InputLabel>
              <Select
                value={localEditedRow.role || 'USER'}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="SuperAdmin">Super Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Tester">Tester</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      )}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleUpdate} variant="contained" color="primary">
        Update
      </Button>
      <Button onClick={handleClose} variant="outlined" color="secondary">
        Cancel
      </Button>
    </DialogActions>
  </Dialog>
);

};

export default EditUser;
