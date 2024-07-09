import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
//
import NavList from './NavList';
import { useAuthContext } from 'auth/useAuthContext';

// ----------------------------------------------------------------------

NavDesktop.propTypes = {
  data: PropTypes.array,
  isOffset: PropTypes.bool,
};

export default function NavDesktop({ isOffset, data }) {

  const { user } = useAuthContext();

  return (
    <Stack component='nav' direction='row' spacing={5} sx={{ mr: 5, height: 1 }}>
      {data.map((link) => (
        ((user === null && link.role === 'user') || (user !== null && (link.role === 'user' || user.role.endsWith(link.role)))) &&
        <NavList key={link.title} item={link} isOffset={isOffset} />
      ))}
    </Stack>
  );
}
