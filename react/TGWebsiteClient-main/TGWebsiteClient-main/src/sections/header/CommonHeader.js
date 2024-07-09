import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Stack, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useResponsive from '../../hooks/useResponsive';
// utils
// config
import { HEADER, WS_SERVER_URL } from '../../config-global';
// routes
// components
import Logo from 'components/logo';
import SvgColor from 'components/svg-color';
import ThemeToggleButton from 'components/ThemeToggleButton';
import AccountPopover from './AccountPopover';
//
import navConfig from './nav/config-navigation';
import NavMobile from './nav/mobile';
import NavDesktop from './nav/desktop';

import { useAuthContext } from 'auth/useAuthContext';
import { useSettingsContext } from 'components/settings/SettingsContext';
import NotificationsPopover from './NotificationsPopover';
import useWebSocket from 'react-use-websocket';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentStatus, setLicenseKey } from '../../redux/slices/price';
import { getNotifications, addNotification } from '../../redux/slices/notification';
import { useNavigate } from 'react-router-dom';
import {
  setPriceDlgOpen,
} from '../../redux/slices/price';
// ----------------------------------------------------------------------

export default function CommonHeader(props) {
  const carouselRef = useRef(null);
  const dispatch = useDispatch();
  const { themeMode, onToggleMode } = useSettingsContext();
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_MAIN_DESKTOP);

  const { isAuthenticated } = useAuthContext();
  const { isInitialized } = useSelector((state) => state.notification);

  const navigate = useNavigate();

  const {
    sendMessage,
    sendJsonMessage,
    lastMessage,
    lastJsonMessage,
    readyState,
    getWebSocket,
  } = useWebSocket(WS_SERVER_URL, {
    onOpen: () => sendJsonMessage({ type: 'token', content: localStorage.getItem('accessToken') }),
    //Will attempt to reconnect on all close events, such as server shutting down
    shouldReconnect: (closeEvent) => true,
    onMessage: (e) => {
      const msg = JSON.parse(e.data);
      switch (msg.type) {
        case 'payment':
          if (msg.data.paymentStatus === 'Purchased') {
            setTimeout(function() {
              dispatch(setPriceDlgOpen(false));
              navigate('/profile/license');
            }, 3000);
          }
          dispatch(setPaymentStatus(msg.data.paymentStatus));
          dispatch(setLicenseKey(msg.data.licenseKey));
          break;
        case 'notification':
          dispatch(addNotification(msg.data.notification));
          break;
      }
    },
  });

  useEffect(() => {
    if (!isInitialized) {
      dispatch(getNotifications());
    }
  }, []);

  return (
    <Toolbar
      disableGutters
      sx={{
        height: {
          xs: HEADER.H_MOBILE,
          md: HEADER.H_MAIN_DESKTOP - 16,
        },
        bgcolor: themeMode == 'light' ? '#ffffff' : '#181A20',
        // ...bgBlur({ color: theme.palette.background.default }),
        transition: theme.transitions.create(['height', 'background-color'], {
          easing: theme.transitions.easing.easeInOut,
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Stack direction='row' alignItems='center' sx={{ height: 1, width: 1, px: 3 }}>
        {(!props.hideLogo) && <Logo sx={{ mr: 3 }} />}

        {isDesktop && <NavDesktop isOffset={isOffset} data={navConfig} />}
        <Box sx={{ flexGrow: 1 }} />
        {isAuthenticated ? (
          <Stack direction='row' alignItems='center' spacing={2}>
            <NotificationsPopover />
            <AccountPopover />
          </Stack>
        ) : (
          <Stack direction='row' spacing={2}>
            <Button component={RouterLink} to='/auth/login'>
              Log In
            </Button>
            <Button
              variant='contained'
              component={RouterLink}
              to='/auth/register'
              sx={{ borderRadius: 0.5 }}
              startIcon={
                <SvgColor src='/assets/icons/navbar/ic_register.svg' sx={{ width: 20 }} />
              }
            >
              Register
            </Button>
          </Stack>
        )}
        <ThemeToggleButton />
        {!isDesktop && <NavMobile subNav={props.subNav} isOffset={isOffset} data={navConfig} />}
      </Stack>
    </Toolbar>
  );
}

// ----------------------------------------------------------------------

Shadow.propTypes = {
  sx: PropTypes.object,
};

function Shadow({ sx, ...other }) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
