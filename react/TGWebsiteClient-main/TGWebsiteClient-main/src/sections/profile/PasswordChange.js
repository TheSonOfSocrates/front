import { useState } from 'react';
// @mui
import { Button, Card, CardContent, CardHeader, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { changePassword } from '../../api/profile';
import { useSnackbar } from 'notistack';

export default function PasswordChange() {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const handleOldPasswordChanged = (e) => {
    setOldPassword(e.target.value);
  };

  const handleNewPasswordChanged = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChanged = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      enqueueSnackbar('Password doesn\'t match.', { variant: 'error' });
      return;
    }

    const response = await changePassword(oldPassword, newPassword);
    if (response.status === 200) {
      if (response.data.success) {
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        enqueueSnackbar('Password was changed successfully.', { variant: 'success' });
      } else {
        enqueueSnackbar(response.data.msg, { variant: 'error' });
      }
    } else {
      enqueueSnackbar('Failed to connect the server.', { variant: 'error' });
    }
  };

  return (
    <>
      <Card>
        <CardHeader title='Password Change' />
        <CardContent container sx={{ paddingTop: 5 }}>
          <Stack direction='column' spacing={2} alignItems='left' justifyContent='space-between'>

            <TextField
              label='Old Password'
              sx={{ width: '100%' }}
              value={oldPassword}
              type='password'
              onChange={handleOldPasswordChanged}
            />

            <TextField
              label='New Password'
              sx={{ width: '100%' }}
              value={newPassword}
              type='password'
              onChange={handleNewPasswordChanged}
            />

            <TextField
              label='Confirm Password'
              sx={{ width: '100%' }}
              value={confirmPassword}
              type='password'
              onChange={handleConfirmPasswordChanged}
            />

            <div style={{ textAlign: 'right' }}>
              <Button variant='contained' onClick={handleChangePassword}
                      startIcon={<Iconify icon='tabler:status-change' />}>
                Change
              </Button>
            </div>

          </Stack>
        </CardContent>
      </Card>
    </>
  );
}