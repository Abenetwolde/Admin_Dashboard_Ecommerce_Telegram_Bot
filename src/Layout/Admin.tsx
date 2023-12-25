// AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';
import routes from '../route.tsx';

const AdminLayout = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  // Get the current route to determine the selected category
  const currentRoute = routes.find((route) => location.pathname.includes(route.layout + route.path));
  const defaultSelectedCategory = currentRoute ? currentRoute.name : '';

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className=" relative flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-${showSidebar ? '1/6' : '20'} flex-shrink-0 bg-gray-200 text-white overflow-hidden ransition-width duration-300 ease-in-out`}
      >
        {/* Sidebar content goes here. */}
        <Sidebar
          routes={routes}
          logo={{
            innerLink: '/admin/dashboard',
            imgSrc: 'your-image-source',
            imgAlt: 'your-image-alt',
            title: 'Your Title',
          }}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full bg-red-400 ">
        <AdminNavbar selectedCategory={selectedCategory || defaultSelectedCategory} />
        <div className="flex flex-col flex-1 overflow-hidden  bg-amber-400">
          {/* Main Content */}
          <div >
            <Outlet />
          </div>
          {/* Admin Footer */}
          
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
