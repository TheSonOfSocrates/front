import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { noCase } from 'change-case';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
// utils
import { fToNow } from '../../utils/formatTime';
// components
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotifications, viewNotification, viewAllNotification } from '../../redux/slices/notification';

// ----------------------------------------------------------------------

export default function NotificationsPopover() {

  const { notifications } = useSelector((state) => state.notification);

  const totalUnRead = notifications?.filter((item) => item.status === 'New').length;

  const [open, setOpen] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    dispatch(viewAllNotification());
  };

  const handleGoNotificationPage = () => {
    navigate('/profile/notifications');
    setOpen(null);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color='error'>
          <Iconify icon='eva:bell-fill' />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant='subtitle1'>Notifications</Typography>
            <Typography variant='body2' sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=' Mark all as read'>
              <IconButton color='primary' onClick={handleMarkAllAsRead}>
                <Iconify icon='eva:done-all-fill' />
              </IconButton>
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
            {notifications.slice(-5).reverse().map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple onClick={handleGoNotificationPage}>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

function NotificationItem({ notification }) {

  const dispatch = useDispatch();
  const handleViewNotification = (notification) => {
    if (notification.status === 'New')
      dispatch(viewNotification(notification._id));
  };

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification?.status === 'New' && {
          bgcolor: 'action.selected',
        }),
      }}
      onClick={() => handleViewNotification(notification)}
    >
      <ListItemAvatar>
        <Tooltip title={notification.sender.name} arrow>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>
            <img src={'/uploads/avatar/' + notification.sender.avatar} />
          </Avatar>
        </Tooltip>
      </ListItemAvatar>
      <ListItemText
        primary={<Typography variant='subtitle2'>
          {notification?.content}
        </Typography>}
        secondary={
          <Typography
            variant='caption'
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon='eva:clock-outline' sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification?.date)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}