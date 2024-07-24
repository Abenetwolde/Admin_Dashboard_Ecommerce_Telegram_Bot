import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import {Box, Stack, AppBar, Toolbar, Tooltip} from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '../../../utils/cssStyles';
// config
import { HEADER, NAVBAR } from '../../../config';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
// import AccountPopover from './AccountPopover';
// import LanguagePopover from './LanguagePopover';
// import ContactsPopover from './ContactsPopover';
// import NotificationsPopover from './NotificationsPopover';
import Image from "../../../components/Image";
import NotificationsPopover from './NotificationsPopover';
import PopoverMenu from './PopoverMenu';
import { useState } from 'react';
import LanguagePopover from './LanguagePopover';
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})(({ isCollapse, isOffset, verticalLayout, theme }) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {

    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

DashboardHeader.propTypes = {
  onOpenSidebar: PropTypes.func,
  isCollapse: PropTypes.bool,
  verticalLayout: PropTypes.bool,
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;
  const [anchorEl, setAnchorEl] = useState(null);
  const isDesktop = useResponsive('up', 'lg');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const { t } = useTranslation();

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
        <NotificationsPopover />
        <LanguagePopover />
          <IconButtonAnimate placement="right"onClick={handleClick} >
           
              <Image
                  disabledEffect
                  src={`https://th.bing.com/th/id/OIP.fyCCXwkRz9vrY_TsNRq5rgHaHa?rs=1&pid=ImgDetMain`}
                  sx={{width: 32, height: 32}}
              />
        
          </IconButtonAnimate>
          <PopoverMenu anchorEl={anchorEl} handleClose={handleClose} />
{/*   
         <p className='text-blue-600'>{t('welcome')}</p> */}
          {/* <NotificationsPopover /> */}
          {/* <ContactsPopover /> */}
              
          {/* <AccountPopover />  */}
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
