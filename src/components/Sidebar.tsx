// Sidebar.tsx
import React from 'react';
import { NavLink as NavLinkRRD, Link, useLocation } from 'react-router-dom';
import { List, ListItem, ListItemIcon, Typography } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface SidebarProps {
  routes: Array<Route>;
  logo?: Logo;
  showSidebar: boolean;
  toggleSidebar: () => void;
  onCategorySelect: (category: string) => void;
}

interface Route {
  path: string;
  layout: string;
  name: string;
  icon: React.ReactElement;
  appearInSidebar?: boolean;

}

interface Logo {
  innerLink?: string;
  outterLink?: string;
  imgSrc: string;
  imgAlt: string;
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, logo, showSidebar, toggleSidebar,onCategorySelect }) => {
  const location = useLocation();
  // const [selectedCategory, setSelectedCategory] = useState<string>(''); // Keep track of selected category
  const activeRoute = (routeName: string): string => {
    return location.pathname.includes(routeName) ? 'active' : '';
  };
  const handleCategoryClick = (category: string) => {
    // setSelectedCategory(category);
    onCategorySelect(category); // Callback to update the selected category in the parent component
  };

  const createLinks = (routes: Array<Route>): React.ReactNode => {
    return routes.map((prop, key) => {
      return prop.appearInSidebar ? (
        <ListItem key={key} className="group">
          <NavLinkRRD
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            activeClassName="active"
            className={`text-sm py-2 px-4 font-medium group flex items-center justify-between text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-300 ease-in-out ${showSidebar ? 'w-full' : 'w-40'
              } ${activeRoute(prop.layout + prop.path)}`}
            style={{
              borderLeft: activeRoute(prop.layout + prop.path) ? '4px solid #3498db' : 'none',
            }}
            onClick={() => handleCategoryClick(prop.name)}
          >
            <div className="flex items-center">
              <ListItemIcon>{prop.icon}</ListItemIcon>
              {showSidebar && <Typography variant="subtitle1">{prop.name}</Typography>}
            </div>
          </NavLinkRRD>
        </ListItem>
      ) : null;
    });
  };

  return (
    <div
      className={`bg-white w-${showSidebar ? 'full' : '20'} h-screen overflow-y-auto transition-width duration-300 ease-in-out`}
    >
      {/* Toggle button */}
      <div className="flex justify-end p-4 transition-all duration-300 ease-in-out">
        <div
          onClick={toggleSidebar}
          className={`bg-white border-2 border-blue-200 p-1 rounded-full transition-transform transform ${showSidebar ? '' : '-rotate-180'
            } cursor-pointer`}
        >
          <ArrowForwardIcon className="text-blue-300" />
        </div>
      </div>
      {/* Sidebar content */}
      <div className="p-4">
        <div className="flex items-center mb-4">
          {logo && (
            <Link to={logo.innerLink} className="flex items-center">
              <img alt={logo.imgAlt} className="w-8 h-8 mr-2" src={logo.imgSrc} />
              {showSidebar && <Typography variant="h6">{logo.title}</Typography>}
            </Link>
          )}
        </div>
        <List>{createLinks(routes)}</List>
      </div>
    </div>
  );
};

export default Sidebar;
