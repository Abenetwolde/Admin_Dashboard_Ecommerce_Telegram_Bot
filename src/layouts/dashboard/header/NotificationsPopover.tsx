// NotificationsPopover.js
import PropTypes from 'prop-types';
import { noCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
// import { fToNow } from '../../../utils/formatTime';
import { fToNow } from '../../../utils/formatTime';
// components
import Iconify from '../../../components/Iconify';
import Scrollbar from '../../../components/Scrollbar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import { useGetAllFeedBackQuery, useGetUpdateFeedbackStatusMutation } from '../../../redux/Api/feedback';

export default function NotificationsPopover() {
  const { data: feedbacks, isLoading } = useGetAllFeedBackQuery({ page:1, limit: 5, search:'' });
  const [notifications, setNotifications] = useState([]);
  const [updateFeedbackStatus] = useGetUpdateFeedbackStatusMutation();
const navigation =useNavigate()

  useEffect(() => {
    if (feedbacks) {
      const formattedFeedbacks = feedbacks?.feedbacks?.map((feedback) => ({
        id: feedback._id,
        title: feedback.user.first_name,
        description: feedback?.feedback,
        avatar: feedback?.user.first_name[0],
        createdAt: feedback.createdAt,
        isUnRead: !feedback.isRead,
      }));
      setNotifications(formattedFeedbacks);
    }
  }, [feedbacks]);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;
  // if(isLoading){
  //   return <div>Loading...</div>
  // }
   
  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    notifications.forEach(notification => {
      if (notification.isUnRead) {
        updateFeedbackStatus({ id: notification.id });
      }
    });

    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const handleNotificationClick = async (id) => {
    await updateFeedbackStatus({ id });
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, isUnRead: false } : notification
      )
    );
    navigation('/dashboard/feedback')
  };

  return (
    <>
      <IconButtonAnimate color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:bell-fill" width={20} height={20} />
        </Badge>
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{ width: 360, p: 0, mt: 1.5, ml: 0.75 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButtonAnimate color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" width={20} height={20} />
              </IconButtonAnimate>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications
              .filter((notification) => notification.isUnRead)
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification} onClick={() => handleNotificationClick(notification.id)} />
              ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications
              .filter((notification) => !notification.isUnRead)
              .map((notification) => (
                <NotificationItem key={notification.id} notification={notification}  onClick={() => handleNotificationClick(notification.id) } />
              ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.string,
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
  onClick: PropTypes.func,
};

function NotificationItem({ notification, onClick }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      onClick={onClick}
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification?.createdAt)}
  
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {noCase(notification.description)}
      </Typography>
    </Typography>
  );

  return {
    avatar: notification.avatar,
    title,
  };
}
