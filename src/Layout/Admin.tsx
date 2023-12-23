// AdminLayout.tsx
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';
import routes from '../route.ts';
const location = useLocation();
const AdminLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-200 text-white">
        {/* Sidebar content goes here. */}
        <Sidebar
       location={location}
        routes={routes}
        logo={{
          innerLink: '/admin/dashboard',
        //  imgSrc: require(''),
          imgAlt: '...'
        }}
      />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminNavbar brandText="Beautiful Layout" />
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Main Content */}
          <div className="flex-1 p-4">
            <Outlet />
          </div>

          {/* Admin Footer */}
          <footer className="mt-auto p-4 bg-gray-200">
            {/* Footer content goes here. */}
            Footer content goes here
          </footer>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
