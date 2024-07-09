import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
// @mui
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader, DialogActions, DialogContent,
  DialogTitle,
  Grid,
  Stack, Tab,
  TextField,
  Typography,
} from '@mui/material';
// components
// mock
import Iconify from '../../components/iconify';
import Label from '../../components/label';
import { checkPassword, getLicenseInfo, expireLicenseKey } from '../../api/profile';
import { getFormattedDateTime } from '../../utils/freqUtils';
import { setPaymentStatus } from '../../redux/slices/price';
import Modal from '@mui/material/Modal';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
// ----------------------------------------------------------------------

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '2px solid #15b3b2',
  borderRadius: 3,
  boxShadow: 24,
  p: 2,
};

const styles = {
  licenseInfo: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    display: 'block!important',
    ml: 3,
    fontSize: 25,
    padding: 3,
  },
};

let actionType;

export default function LicensePage() {
  const [pwdChkDlgOpen, setPwdChkDlgOpen] = useState(false);
  const [licenseInfo, setLicenseInfo] = useState(null);
  const [showLicenseKey, setShowLicenseKey] = useState(false);
  const [password, setPassword] = useState('');

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const handleCopyPassword = () => {
    setPwdChkDlgOpen(true);
    actionType = 'copy';
  };

  const handleViewPassword = () => {
    if (showLicenseKey) {
      setShowLicenseKey(false);
    } else {
      setPwdChkDlgOpen(true);
      actionType = 'view';
    }
  };

  const handleExpirePassword = () => {
    setPwdChkDlgOpen(true);
    actionType = 'expire';
  };

  const closePwdChkDlg = () => {
    setPwdChkDlgOpen(false);
  };

  const checkPwd = async () => {
    setPwdChkDlgOpen(false);
    const response = await checkPassword(password);
    if (response.status === 200 && response.data.success) {
      setPassword('');
      if (actionType === 'view') {
        setShowLicenseKey(true);
      } else if (actionType === 'copy') {
        enqueueSnackbar('License key copied into clipboard.', { variant: 'info' });
        navigator.clipboard.writeText(licenseInfo.licenseKey);
      } else if (actionType === 'expire') {
        const response = await expireLicenseKey();
        if (response.status === 200 && response.data.success) {
          enqueueSnackbar('License key expired successfully.', { variant: 'info' });
          setLicenseInfo(response.data.licenseInfo);
          dispatch(setPaymentStatus('Not'));
        } else {
          enqueueSnackbar('License key expiration failed.', { variant: 'error' });
        }
      }
    } else {
      enqueueSnackbar('Password is wrong.', { variant: 'error' });
    }
  };

  const handlePasswordChanged = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    async function loadLicenseInfo() {
      const response = await getLicenseInfo();
      if (response.status === 200) {
        setLicenseInfo(response.data.licenseInfo);
      }
    }

    loadLicenseInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title> Profile | License </title>
      </Helmet>

      <Grid container spacing={3} sx={{ padding: 2 }}>
        <Grid item md={12}>
          <Card>
            <CardHeader title='License Information' />
            <CardContent container sx={{ paddingTop: 5 }}>
              <Grid container spacing={3} sx={{ padding: 2 }}>
                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction='row' justifyContent='center' style={{ alignItems: 'center' }}>
                    <Typography variant='h6' whiteSpace='nowrap'>
                      License Status
                    </Typography>
                    <Label
                      color={licenseInfo?.status === 'Purchased' ? 'success' : 'error'}
                      sx={styles.licenseInfo}>{licenseInfo?.status === 'Purchased' ? 'Active' : 'Inactive'}</Label>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <Stack direction='row' justifyContent='center' style={{ alignItems: 'center' }}>
                    <Typography variant='h6' whiteSpace='nowrap'>
                      License Expire At
                    </Typography>
                    <Label
                      sx={styles.licenseInfo}
                      color={licenseInfo?.status === 'Purchased' ? 'success' : 'error'}
                      sx={styles.licenseInfo}>{licenseInfo?.status === 'Purchased' ? getFormattedDateTime(new Date(licenseInfo?.expireAt)) : 'NULL'}</Label>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6} md={4} mb={2}>
                  <Stack direction='row' justifyContent='center' style={{ alignItems: 'center' }}>
                    <Typography variant='h6' whiteSpace='nowrap'>
                      Active Plan
                    </Typography>
                    <Label
                      color={licenseInfo?.status === 'Purchased' ? 'success' : 'error'}
                      sx={styles.licenseInfo}>{licenseInfo?.status === 'Purchased' ? licenseInfo?.activePlan : 'NULL'}</Label>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                  <Stack direction='column' justifyContent='center' style={{ alignItems: 'center' }}>
                    <Typography variant='h5' mb={1}>
                      License Key
                    </Typography>
                    <TextField
                      hiddenLabel
                      sx={{ width: '100%' }}
                      value={licenseInfo?.status === 'Purchased' ? licenseInfo?.licenseKey : ''}
                      type={showLicenseKey ? 'text' : 'password'}
                      InputProps={{
                        readOnly: false,
                        inputProps: {
                          style: { textAlign: 'center' },
                        },
                      }}
                    />
                    <Stack direction='row' alignItems='center' spacing={2} mt={2}>
                      <Button color='info' disabled={licenseInfo?.status !== 'Purchased'} variant='contained'
                              sx={{ mr: 1 }} onClick={handleCopyPassword}
                              startIcon={<Iconify icon='eva:copy-fill' />}>
                        Copy License Key
                      </Button>

                      <Button color='success' disabled={licenseInfo?.status !== 'Purchased'} variant='contained'
                              sx={{ mr: 1 }} onClick={handleViewPassword}
                              startIcon={<Iconify icon='mdi:eye' />}>
                        {showLicenseKey ? 'Hide License Key' : 'Show License Key'}
                      </Button>

                      <Button variant='contained' disabled={licenseInfo?.status !== 'Purchased'} color='error'
                              onClick={handleExpirePassword}
                              startIcon={<Iconify icon='mdi:cancel-octagon-outline' />}>
                        Expire License Key
                      </Button>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal
        open={pwdChkDlgOpen}
        onClose={closePwdChkDlg}>
        <Box sx={modalStyle}>
          <DialogTitle>Please input your password to unlock.</DialogTitle>
          <DialogContent>
            <TextField
              sx={{ width: '100%', mb: 2 }}
              value={password}
              type='password'
              onChange={handlePasswordChanged}
              autoFocus
            />
          </DialogContent>
          <DialogActions>
            <Button variant='contained' onClick={closePwdChkDlg}>Cancel</Button>
            <Button variant='contained' onClick={checkPwd}>
              Ok
            </Button>
          </DialogActions>
        </Box>
      </Modal>
    </>
  );
}
