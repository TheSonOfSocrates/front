import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import {
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Stack,
  Popper,
  Fade,
} from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
// component
import Iconify from '../../../components/iconify';
import { deleteNotifications } from '../../../redux/slices/notification';
import { useState } from 'react';
import Paper from '@mui/material/Paper';

// ----------------------------------------------------------------------

const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

// ----------------------------------------------------------------------

NotificationListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function NotificationListToolbar({ idList, numSelected, filterName, onFilterName }) {
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  const handleYesDelete = () => {
    dispatch(deleteNotifications(idList));
    setOpen(false);
  };

  const handleNoDelete = () => {
    setOpen(false);
  };

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'white',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={10}>
            <Paper sx={{ textAlign: 'right' }}>
              <Typography sx={{ p: 2 }}>Are you gonna delete selected notifications?</Typography>
              <ButtonGroup
                sx={{ mb: 2, mr: 2 }}
                orientation='horizontal'>
                <Button onClick={handleNoDelete}>No</Button>
                <Button onClick={handleYesDelete}>Yes</Button>
              </ButtonGroup>
            </Paper>
          </Fade>
        )}
      </Popper>

      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder='Search notifications...'
          startAdornment={
            <InputAdornment position='start'>
              <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Tooltip title='Delete'>
            <IconButton onClick={handleClick('top-start')}>
              <Iconify color='white' icon='eva:trash-2-fill' />
            </IconButton>
          </Tooltip>
        </Stack>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton>
            <Iconify icon='ic:round-filter-list' />
          </IconButton>
        </Tooltip>
      )}
    </StyledRoot>
  );
}
