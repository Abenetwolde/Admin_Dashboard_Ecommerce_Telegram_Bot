import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  Grid,
  FormLabel,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateUserMutation } from "../../redux/Api/User";
import Label from "../Label";
const CustomLabel = ({ children }) => {
    const theme =useTheme()
    return (
      <Typography style={{ color: theme.palette.text.primary, marginBottom: '0.5rem' }}>
        {children}
      </Typography>
    );
  };
  


const AddUserDialog = ({ isOpen, handleClose }) => {
    const { handleSubmit, control, reset, formState: { errors } } = useForm();
  const [createUser, { isLoading }] = useCreateUserMutation();

  const onSubmit = async (data) => {
    try {
      await createUser(data).unwrap();
      toast.success('User created successfully!');
      reset();
      handleClose();
    } catch (error) {
      toast.error('Failed to create user');
      console.error('Error creating user:', error);
    }
  };

  return (
<Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>Add User</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.telegramid}>
                <CustomLabel>Telegram ID</CustomLabel>
                <Controller
                  name="telegramid"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Telegram ID is required' }}
                  render={({ field }) => <TextField {...field}  />}
                />
                {errors.telegramid && <FormHelperText>{errors.telegramid.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.telegramid}>
                <CustomLabel>Email </CustomLabel>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Email is required' }}
                  render={({ field }) => <TextField {...field}  />}
                />
                {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.first_name}>
                <CustomLabel>First Name</CustomLabel>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'First name is required' }}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.first_name && <FormHelperText>{errors.first_name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.last_name}>
                <CustomLabel>Last Name</CustomLabel>
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Last name is required' }}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.last_name && <FormHelperText>{errors.last_name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.password}>
                <CustomLabel>Password</CustomLabel>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Password is required' }}
                  render={({ field }) => <TextField {...field} />}
                />
                {errors.password && <FormHelperText>{errors.password.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.username}>
                <CustomLabel>Username</CustomLabel>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Username is required' }}
                  render={({ field }) => <TextField {...field}  />}
                />
                {errors.username && <FormHelperText>{errors.username.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.role}>
                <CustomLabel>Role</CustomLabel>
                <Controller
                  name="role"
                  control={control}
                  defaultValue="Admin"
                  rules={{ required: 'Role is required' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="SuperAdmin">Super Admin</MenuItem>
                      <MenuItem value="User">User</MenuItem>
                      <MenuItem value="Tester">Tester</MenuItem>
                    </Select>
                  )}
                />
                {errors.role && <FormHelperText>{errors.role.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.from}>
                <CustomLabel>From</CustomLabel>
                <Controller
                  name="from"
                  control={control}
                  defaultValue="Bot"
                  rules={{ required: 'From is required' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="Bot">Bot</MenuItem>
                      <MenuItem value="Channel">Channel</MenuItem>
                      <MenuItem value="Refferal">Refferal</MenuItem>
                    </Select>
                  )}
                />
                {errors.from && <FormHelperText>{errors.from.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="dense" error={!!errors.language}>
                <CustomLabel>Language</CustomLabel>
                <Controller
                  name="language"
                  control={control}
                  defaultValue="en"
                  rules={{ required: 'Language is required' }}
                  render={({ field }) => (
                    <Select {...field}>
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="am">Amharic</MenuItem>
                    </Select>
                  )}
                />
                {errors.language && <FormHelperText>{errors.language.message}</FormHelperText>}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button type="submit" color="primary" variant="contained" disabled={isLoading}>
            {isLoading ? 'Adding...' : 'Add User'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddUserDialog;
