import React, { useState, useRef, useEffect } from 'react';
import LicenseCheck from '../util/licencheck/LicenseCheck';
import {
  confirmPaypalPayment,
  createCoinTransaction,
  createStripePaymentIntent,
  setPaymentStatus,
} from '../../../redux/slices/price';
import { dispatch } from '../../../redux/store';
import { useSelector } from 'react-redux';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { getCoinList } from '../../../api/price';
import Box from '@mui/material/Box';
import { Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSnackbar } from 'notistack';
import { formatTimeFromSeconds } from '../../../utils/freqUtils';

const Coinpayments = (props) => {
  const [refresh, setRefresh] = useState(false);
  const licenseRef = useRef();

  const [coinList, setCoinList] = useState([]);
  const [selectedCoinName, setSelectedCoinName] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [timerStarted, setTimerStarted] = useState(false);

  const [qrUrl, setQrUrl] = useState('');
  const [address, setAddress] = useState('');
  const [availableTime, setAvailableTime] = useState(0);
  const [amount, setAmount] = useState('');
  const [checkUrl, setCheckUrl] = useState('');
  const [statusUrl, setStatusUrl] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const { isLoading, paymentStatus, selectedPlanId } = useSelector((state) => state.price);

  useEffect(() => {
    if (timerStarted && availableTime !== 0) {
      startTimer(availableTime);
    }
  }, [timerStarted]);

  useEffect(() => {
    const fetchCoinList = async function() {
      const response = await getCoinList();
      if (response.status === 200 && response.data.success) {
        setCoinList(response.data.coinList);
      }
    };

    fetchCoinList();
  }, []);

  const handleGoCheck = () => {
    window.open(checkUrl, '_blank');
  };

  const handleGoStatus = () => {
    window.open(statusUrl, '_blank');
  };

  const handleLicenseStatusChanged = () => {
    setRefresh(!refresh);
  };

  const handleCoinSelectionChange = (e, option) => {
    setSelectedCoinName(option?.name);
  };

  const downTime = (availableTime) => {
    const down = availableTime - 1;
    setAvailableTime(down);

    startTimer(down);
  }

  const startTimer = (remainTime) => {
    if (remainTime < 0)
      return;
    setTimeout(() => downTime(remainTime), 1000);
  };

  const handleSubscribe = async () => {
    if (selectedCoinName === '') {
      enqueueSnackbar('You need to select coin.', { variant: 'error' });
      return;
    }

    const response = await dispatch(createCoinTransaction({
      planId: selectedPlanId,
      coinName: selectedCoinName,
      licensePeriod: props.licensePeriod,
    }));

    if (response.status === 200 && response.data.success) {
      const result = response.data.result;
      setQrUrl(result.qrcode_url);
      setAddress(result.address);
      setAvailableTime(result.timeout);
      setAmount(result.amount);
      setCheckUrl(result.checkout_url);
      setStatusUrl(result.status_url);
      setTimerStarted(true);
    }
  };

  return (
    <div>
      <LicenseCheck ref={licenseRef} handleLicenseStatusChanged={handleLicenseStatusChanged} />
      {licenseRef.current && licenseRef.current.getLicenseStatus() && paymentStatus === 'Not' &&
        <>
          <Autocomplete
            sx={{ width: '100%' }}
            options={coinList}
            autoHighlight
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                <img
                  loading='lazy'
                  width='20'
                  src={option.image}
                />
                {option.name}
              </Box>
            )}
            onChange={handleCoinSelectionChange}
            value={coinList.find((coin) => coin.name === inputValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label='Coin'
                inputProps={{
                  ...params.inputProps
                }}
              />
            )}
          />
          <Box sx={{ marginBottom: 7, marginTop: 2 }}>
            <Button style={{ float: 'right' }} variant='contained' endIcon={<SendIcon />}
                    disabled={isLoading || paymentStatus !== 'Not'} onClick={handleSubscribe}>
              {isLoading ? 'Processing…' : 'Subscribe'}
            </Button>
          </Box>
        </>
      }

      {paymentStatus === 'Ordered' && timerStarted &&
        <>
          <TextField
            label='Address'
            value={address}
            sx={{ mt: 2, width: '100%' }}
            width='100%'>
          </TextField>

          <Stack component='span' direction='row' spacing={2} sx={{ mt: 2, mb: 2 }}>
            <img
              loading='lazy'
              width='300'
              src={qrUrl}
            />

            <Stack component='span' direction='column' spacing={2}>
              <TextField
                label='Amount'
                value={amount}
                maxRows={1}
                minRows={1}
              />
              <TextField
                label='Available time'
                value={formatTimeFromSeconds(availableTime)}
                maxRows={1}
                minRows={1}
              />
            </Stack>
          </Stack>

          <Stack component='span' direction='row' alignItems='center' spacing={2}>
            <Button disabled={availableTime < 0} variant='contained' endIcon={<SendIcon />}
                    onClick={handleGoCheck}>
              Check transaction
            </Button>
            <div style={{ flexGrow: 1 }} />
            <Button disabled={availableTime < 0} variant='contained' endIcon={<SendIcon />}
                    onClick={handleGoStatus}>
              Check Status
            </Button>
          </Stack>
        </>
      }
    </div>

  );
};

export default Coinpayments;