import React from 'react';
import { NavLink as NavLinkRRD, Link, useLocation } from 'react-router-dom';
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
  outerLink?: string;
  imgSrc: string;
  imgAlt: string;
  title?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ routes, logo, showSidebar, toggleSidebar, onCategorySelect }) => {
  const location = useLocation();

  const activeRoute = (routeName: string): string => {
    return location.pathname.includes(routeName) ? 'active' : '';
  };

  const handleCategoryClick = (category: string) => {
    onCategorySelect(category);
  };

  const createLinks = (routes: Array<Route>): React.ReactNode => {
    return routes.map((prop, key) => {
      return prop.appearInSidebar ? (
        <li key={key} className="mb-1">
          <NavLinkRRD
            to={prop.layout + prop.path}
            className={`text-sm py-2 px-2 font-medium group flex items-center justify-between text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 transition duration-300 ease-in-out 
              } ${activeRoute(prop.layout + prop.path)}`}
            style={{
              borderLeft: activeRoute(prop.layout + prop.path) ? '4px solid #3498db' : 'none',
            }}
            onClick={() => handleCategoryClick(prop.name)}
          >
            <div className={`flex w-${showSidebar ? 'full' : '8'} items-center p-1 rounded ${showSidebar ? 'mr-2' : 'mr-1'}  transition-all duration-300 ease-in-out gap-3`}>
             <span className='!text-blue-300'>{prop.icon}</span> 
              {showSidebar && <span className="text-base ml-2">{prop.name}</span>}
            </div>
          </NavLinkRRD>
        </li>
      ) : null;
    });
  };

  return (
    <div className={`bg-white flex-col h-screen overflow-y-auto duration-300 ease-in-out  !mx-13`}>
      <div className="flex  h-full  w-full flex-col justify-start px-1 py-2 transition-all duration-300 ease-in-out">
        <div className=' align-center justify-between'  >
     
          <div
            onClick={toggleSidebar}
            className={`bg-white border-2 border-blue-200 p-1 w-8 h-8 align-center  justify-end rounded-full transition-transform transform ${showSidebar ? '' : '-rotate-180'
              } cursor-pointer`}
          >

            <ArrowForwardIcon className={`text-blue-300 rounded-full p-1  transition-all duration-300 ease-in-out`} />
          </div>
        </div>

        <div className="p-1">
          <div className="flex justify-center items-center mb-4 mt-5">
            {logo && (
              <Link to={logo.innerLink} className="flex items-center">
                <img alt={logo.imgAlt} className="w-8 h-8" src={logo.imgSrc} />
                {showSidebar && <span className="text-xl ml-2">{logo.title}</span>}
              </Link>
            )}
          </div>
          <div  className="flex justify-center items-center width-full bg-slate-100 h-0.5 mb-4 mt-5"> </div>
          <ul>{createLinks(routes)}</ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
