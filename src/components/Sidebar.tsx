import React, { useState } from 'react';
import { NavLink as NavLinkRRD, Link, useLocation } from 'react-router-dom';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarProps {
  routes: Array<Route>;
  logo?: Logo;
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

const Sidebar: React.FC<SidebarProps> = ({ routes, logo }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const activeRoute = (routeName: string): string => {
    return location.pathname.includes(routeName) ? 'active' : '';
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const createLinks = (routes: Array<Route>): React.ReactNode => {
    return routes.map((prop, key) => {
      return prop.appearInSidebar ? (
        <ListItem key={key}>
          <NavLinkRRD
            to={prop.layout + prop.path}
            tag={NavLinkRRD}
            onClick={() => setDrawerOpen(false)}
            activeClassName="active"
            className={`text-sm py-2 px-4 font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:text-gray-900 focus:bg-gray-100 transition duration-150 ease-in-out ${activeRoute(
              prop.layout + prop.path
            )}`}
          >
            <ListItemIcon>{prop.icon}</ListItemIcon>
            <ListItemText primary={prop.name} />
          </NavLinkRRD>
        </ListItem>
      ) : null;
    });
  };

  return (
    <>
      {/* Mobile menu button */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        className="mr-2 md:hidden"
      >
        <MenuIcon />
      </IconButton>

      {/* Drawer (both for mobile and desktop) */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant="temporary"
        className="z-50"
      >
        <div className="p-4">
          <div className="flex items-center mb-4">
            {logo && (
              <Link to={logo.innerLink} className="flex items-center">
                <img alt={logo.imgAlt} className="w-8 h-8 mr-2" src={logo.imgSrc} />
                <Typography variant="h6">{logo.title}</Typography>
              </Link>
            )}
          </div>
          <List>{createLinks(routes)}</List>
        </div>
      </Drawer>

      {/* Desktop Sidebar */}
      <Drawer variant="permanent" anchor="left" className="w-64 bg-white hidden md:flex md:flex-shrink-0 border-r border-gray-200">
        <div className="p-4">
          {logo && (
            <Link to={logo.innerLink} className="flex items-center">
              <img alt={logo.imgAlt} className="w-8 h-8 mr-2" src={logo.imgSrc} />
              <Typography variant="h6">{logo.title}</Typography>
            </Link>
          )}
        </div>
        {createLinks(routes)}
      </Drawer>
    </>
  );
};

export default Sidebar;
