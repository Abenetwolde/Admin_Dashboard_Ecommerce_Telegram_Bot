import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Avatar,
  Container
} from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

function AdminNavbar(props: any) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position="static"  className="bg-primary">
        <Container maxWidth="xl">
          <Toolbar>
            <Link to="/" className="flex items-center text-white no-underline">
              <Typography variant="h6" className="hidden lg:inline-block">
                Brand
              </Typography>
            </Link>

            <div className="flex-grow" />

            <div className="hidden md:flex items-center">
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <Avatar alt="Admin" />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <i className="ni ni-user-run" />
                  <span>Logout</span>
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default AdminNavbar;
