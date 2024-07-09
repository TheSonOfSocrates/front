import PropTypes from 'prop-types';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { Drawer, IconButton, List } from '@mui/material';
// config
import { NAV } from '../../../../config-global';
// components
import Logo from '../../../../components/logo';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import NavList from './NavList';
import { AuthContext } from '../../../../auth/JwtContext';

// ----------------------------------------------------------------------

NavMobile.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};

export default function NavMobile({ subNav, isOffset, data }) {
  const { pathname } = useLocation();

  const [navOpen, setNavOpen] = useState(false);
  const [subNavOpen, setSubNavOpen] = useState(false);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (navOpen || subNavOpen) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleNavOpen = () => {
    setNavOpen(true);
  };

  const handleSubNavOpen = () => {
    setSubNavOpen(true);
  };

  const handleClose = () => {
    setNavOpen(false);
    setSubNavOpen(false);
  };

  return (
    <>
      <IconButton
        onClick={handleNavOpen}
        sx={{
          ml: 1,
          ...(isOffset && {
            color: 'text.primary',
          }),
        }}
      >
        <Iconify icon='eva:menu-2-fill' />
      </IconButton>

      {subNav && <IconButton
        onClick={handleSubNavOpen}
        sx={{
          mr: 1,
          color: 'text.primary',
          display: { lg: 'none' },
          float: 'left',
          position: 'absolute'
        }}>
        <Iconify icon='eva:menu-2-fill' />
      </IconButton>}

      <Drawer
        open={navOpen || subNavOpen}
        onClose={handleClose}
        PaperProps={{
          sx: {
            pb: 5,
            width: NAV.W_BASE,
          },
        }}
      >
        <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />

          {navOpen && <List component='nav' disablePadding>
            {data.map((link) => (
              ((authContext.user === null && link.role === 'user') || (authContext.user !== null && (link.role === 'user' || authContext.user.role.endsWith(link.role)))) &&
              <NavList key={link.title} item={link} />
            ))}
          </List>}

          {subNavOpen && <List component='nav' disablePadding>
            {subNav.map((link) => (
              <NavList key={link.title} item={link} />
            ))}
          </List>}
        </Scrollbar>
      </Drawer>
    </>
  );
}
