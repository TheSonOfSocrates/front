import PropTypes from 'prop-types';
// @mui
import { styled, alpha } from '@mui/material/styles';
import {
  Toolbar,
  Tooltip,
  Stack,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Box,
  DialogTitle, DialogContent, TextField, DialogActions, Button,
} from '@mui/material';
// component
import Iconify from '../../../components/iconify';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendNotifications } from '../../../redux/slices/notification';
import { useSnackbar } from 'notistack';

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

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '70%',
  maxWidth: '700px',
  bgcolor: 'background.paper',
  border: '2px solid #15b3b2',
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
};

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ selectedUsers, numSelected, filterName, onFilterName }) {

  const [sendNotiDlgOpen, setSendNotiDlgOpen] = useState(false);
  const [notiMsg, setNotiMsg] = useState('');

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const handleOpenNotiDlg = () => {
    setSendNotiDlgOpen(true);
  }

  const closeSendNotiDlg = () => {
    setSendNotiDlgOpen(false);
    setNotiMsg('');
  }

  const handleSendNoti = async () => {
    const result = await dispatch(sendNotifications(selectedUsers, notiMsg));
    if (result) {
      closeSendNotiDlg();
      enqueueSnackbar('Notifications sent successfully.', { variant: 'success' });
    } else {
      enqueueSnackbar('Failed to send notifications.', { variant: 'error' });
    }
  }

  const handleNotiChanged = (e) => {
    setNotiMsg(e.target.value);
  }

  return (
    <StyledRoot
      sx={{
        ...(numSelected > 0 && {
          color: 'white',
          bgcolor: 'primary.main',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component='div' variant='subtitle1'>
          {numSelected} selected
        </Typography>
      ) : (
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder='Search user...'
          startAdornment={
            <InputAdornment position='start'>
              <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Stack direction='row' alignItems='center' justifyContent='space-between'>
          <Tooltip title='Send Notification'>
            <IconButton onClick={handleOpenNotiDlg}>
              <Iconify color="white" icon='material-symbols:outgoing-mail-outline' />
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
      <Modal
        open={sendNotiDlgOpen}
        onClose={closeSendNotiDlg}>
        <Box sx={modalStyle}>
          <DialogTitle>Send notification to the selected users.</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ width: '100%', mb: 2 }}
              type='password'
              onChange={handleNotiChanged}
              autoFocus
              multiline
              rows={5}
              value={notiMsg}
            />
          </DialogContent>
          <DialogActions>
            <Button color='error' variant='contained'
                    sx={{ mr: 1 }} onClick={closeSendNotiDlg}
                    startIcon={<Iconify icon='mdi:cancel-octagon-outline' />}>
              Cancel
            </Button>
            <Button color='info' disabled={notiMsg.length === 0} variant='contained'
                    sx={{ mr: 1 }} onClick={handleSendNoti}
                    startIcon={<Iconify icon='material-symbols:send-outline-rounded' />}>
              Send
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </StyledRoot>
  );
}
