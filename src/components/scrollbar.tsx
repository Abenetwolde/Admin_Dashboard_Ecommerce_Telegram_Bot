import PropTypes from 'prop-types';
<<<<<<< HEAD
import SimpleBarReact from 'simplebar-react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(() => ({
=======
import { memo, forwardRef } from 'react';
import SimpleBar from 'simplebar-react';

import { alpha, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';



// ----------------------------------------------------------------------

const Scrollbar = forwardRef(({ children, sx, ...other }:any, ref) => {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (mobile) {
    return (
      <Box ref={ref} sx={{ overflow: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <StyledRootScrollbar>
      <StyledScrollbar
        scrollableNodeProps={{
          ref,
        }}
        clickOnTrack={false}
        sx={sx}
        {...other}
      >
        {children}
      </StyledScrollbar>
    </StyledRootScrollbar>
  );
});

Scrollbar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
};


// ----------------------------------------------------------------------

 const StyledRootScrollbar = styled('div')(() => ({
>>>>>>> origin/main
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden',
}));

<<<<<<< HEAD
const SimpleBarStyle = styled(SimpleBarReact)(({ theme }) => ({
=======
 const StyledScrollbar = styled(SimpleBar)(({ theme }) => ({
>>>>>>> origin/main
  maxHeight: '100%',
  '& .simplebar-scrollbar': {
    '&:before': {
      backgroundColor: alpha(theme.palette.grey[600], 0.48),
    },
    '&.simplebar-visible:before': {
      opacity: 1,
    },
  },
<<<<<<< HEAD
  '& .simplebar-track.simplebar-vertical': {
    width: 10,
  },
  '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
    height: 6,
  },
=======
>>>>>>> origin/main
  '& .simplebar-mask': {
    zIndex: 'inherit',
  },
}));

<<<<<<< HEAD
// ----------------------------------------------------------------------

Scrollbar.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object,
};

export default function Scrollbar({ children, sx, ...other }) {
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
=======
export default memo(Scrollbar);
>>>>>>> origin/main
