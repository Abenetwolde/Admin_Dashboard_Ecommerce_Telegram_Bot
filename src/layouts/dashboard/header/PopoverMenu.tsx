// PopoverMenu.js
import React, { useState } from 'react';
import { Popover, Box, Button, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logOut } from '../../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
const PopoverMenu = ({ anchorEl, handleClose }) => {
  const dispatch = useDispatch();
  const navigation =useNavigate()
const theme=useTheme()
  const handleLogout = () => {
    dispatch(logOut());
    handleClose();
    navigation('/auth/login')

  };

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={{ p: 2 }}>
        <Button onClick={handleLogout} color='info' fullWidth>
          Logout
        </Button>
      </Box>
    </Popover>
  );
};

export default PopoverMenu;
