import React from 'react';
import { Link } from 'react-router-dom';

interface AdminNavbarProps {
  selectedCategory: string; // Add the prop for the selected category
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ selectedCategory }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
              <div className="flex items-center gap-2 justify-center">
                <div
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  className="mt-6 w-10 h-10 rounded-full overflow-hidden shadow-lg bg-white focus:outline-none justify-center align-center"
                >
                  <img
                    alt="Abnet"
                    src="https://avatars.githubusercontent.com/u/58665822?s=400&u=9df743a470d06bb110b20fd91e53ad93c98f74b2&v=4"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h6 className="text-back font-semibold text-center mr-4 ">
                  Abnet
                </h6>
              </div>
              {anchorEl && (
                <div
                  id="menu-appbar"
                  className="origin-top-right absolute right-5 mt-3 w-48 h-48 overflow-hidden shadow-lg bg-white rounded-md focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-appbar"
                  style={{ border: '2px solid #87CEEB' }}
                >
                  <div className="py-1" role="none">
                    <button
                      onClick={handleClose}
                      className="block px-4 py-10 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
                      role="menuitem"
                    >
                      <i className="ni ni-user-run mr-20 !text-blue-300" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>




          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNavbar;
