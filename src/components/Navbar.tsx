import { Logout, PersonAdd } from '@mui/icons-material';
import { Avatar, Divider, IconButton,  ListItemIcon, Menu, MenuItem, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

interface AdminNavbarProps {
  selectedCategory: string; // Add the prop for the selected category
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ selectedCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleLogout = () => {
    // Remove the user from local storage
    localStorage.removeItem('user');
    // Perform any additional logout actions, such as redirecting to the login page
    // For example, you can use history.push('/login') if you're using React Router
  };

  return (
    <>
      <div
        className="   h-1/9 bg-gradient-to-r  from-gray-50 to-blue-50 shadow-none"
      >
        <div className="container mx-auto ">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-black no-underline">
              <h6 className="text-balck font-semibold uppercase mr-4 ">
                {selectedCategory}
              </h6>
            </Link>

            <div className="flex-grow" />

            <div className="hidden md:flex items-center mr-1 justify-center ">
            <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="medium"
            
            sx={{ ml: 2 ,border:'none'}}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 ,border:'none',stroke:"none"}}>A</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        elevation={0}
        slotProps=     {{ paper: {  sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}}
      
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {/* <MenuItem onClick={handleClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Avatar /> My account
        </MenuItem> */}
        {/* <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem> */}
      
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
            </div>




          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
