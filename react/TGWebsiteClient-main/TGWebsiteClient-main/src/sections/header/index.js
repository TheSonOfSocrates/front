import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { AppBar, Box, Toolbar } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
// components
//
import CommonHeader from './CommonHeader';

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;

const StyledRoot = styled(AppBar)(({ theme, onOpenNav }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: onOpenNav ? `calc(100% - ${NAV_WIDTH + 1}px)` : '100%',
  },
}));

// ----------------------------------------------------------------------

Header.propTypes = {
  onOpenNav: PropTypes.func,
};

export default function Header({ onOpenNav, hideLogo, subNav }) {
  return (
    <StyledRoot onOpenNav={onOpenNav}>
      <CommonHeader hideLogo={hideLogo} subNav={subNav}/>
      <Box sx={{ flexGrow: 1 }} />
    </StyledRoot>
  );
}
