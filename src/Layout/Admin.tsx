// AdminLayout.tsx
import  { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import AdminNavbar from '../components/Navbar.tsx';
import Sidebar from '../components/Sidebar.tsx';
import routes from '../route.tsx';

const AdminLayout = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
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
    <div className=" relative  flex w-screen bg-gradient-to-r  from-gray-50 to-blue-50">
      {/* Sidebar */}
      <div
        className={` w-${showSidebar ? '1/6' : '1/15'}    text-white overflow-hidden duration-300 ease-in-out`}
      >
        {/* Sidebar content goes here. */}
        <Sidebar
          routes={routes}
          logo={{
            innerLink: '/admin/dashboard',
            imgSrc: 'https://th.bing.com/th/id/OIP.Z4NoQEb8sAETU4xYYXcbqAHaHk?rs=1&pid=ImgDetMain',
            imgAlt: 'your-image-alt',
            title: 'Admin Dashboard',
          }}
          showSidebar={showSidebar}
          toggleSidebar={toggleSidebar}
          onCategorySelect={handleCategorySelect}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full">
        <AdminNavbar selectedCategory={selectedCategory || defaultSelectedCategory} />
        <div className="flex-1 flex-col flex-">
          {/* Main Content */}
         
            <Outlet />
          
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
