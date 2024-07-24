// File: BreadcrumbComponent.tsx

import React from 'react';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useLocation, Link as RouterLink } from 'react-router-dom';

const BreadcrumbComponent: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Box p={2} sx={{  left: '20%',  zIndex: 10000,  }}>
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.length > 0 ? (
          <Link component={RouterLink} to="/">
            Home
          </Link>
        ) : (
          <Typography>Home</Typography>
        )}
        {pathnames.map((value, index) => {
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return index === pathnames.length - 1 ? (
            <Typography key={to}>{value}</Typography>
          ) : (
            <Link component={RouterLink} to={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Box>
  );
};

export default BreadcrumbComponent;
