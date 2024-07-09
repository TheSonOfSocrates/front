import React, { useState } from 'react';
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { Alert, Button, TextField } from '@mui/material';
import StripeInput from './StripeInput';
import {Box, Stack} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LicenseCheck from '../util/licencheck/LicenseCheck';
import { useDispatch, useSelector } from 'react-redux';
import { createStripePaymentIntent, setError } from '../../../redux/slices/price';

const StripeCheckoutForm = (props) => {

  const [holderName, setHolderName] = useState('');
  const elements = useElements();
  const dispatch = useDispatch();
  const stripe = useStripe();

  const licenseRef = React.useRef();
  const editorRef = React.useRef();

  const { error, isLoading, paymentStatus, selectedPlanId } = useSelector((state) => state.price);

  const handleSubscribe = async () => {
    if (!licenseRef.current.checkLicenseStatus())
      return;

    let client_secret = await dispatch(createStripePaymentIntent({
      payment_method_types: ['card'],
      amount: props.amount,
      planId: selectedPlanId,
      licensePeriod: props.licensePeriod,
    }));

    confirmPayment(client_secret);
  };

  const confirmPayment = async (client_secret) => {
    const payload = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardNumberElement),
        billing_details: {
          name: holderName,
        },
      },
    });
    if (payload.error) {
      dispatch(setError(payload.error.message));
    } else {
      dispatch(setError(null));
    }
  };

  return (
    <>
      <TextField fullWidth label='CardHolderName' id='cardHolderName'
                 onChange={(e) => {
                   setHolderName(e.target.value);
                 }}
                 value={holderName}
                 sx={{ marginBottom: 2 }} required />

      <TextField
        label='CardNumber'
        id='cardNumber'
        variant='outlined'
        required
        fullWidth
        sx={{ marginBottom: 2 }}
        InputLabelProps={{ shrink: true }}
        InputProps={{
          inputProps: {
            component: CardNumberElement,
            editorRef,
          },
          inputComponent: StripeInput,
        }} />

      <Stack component='span' direction='row' justifyContent={'space-between'} spacing={2} sx={{ mb: 2 }}>

        <TextField
          label='Expiration Date'
          name='ccexp'
          variant='outlined'
          required
          sx={{ width: 200 }}
          InputProps={{
            inputProps: {
              component: CardExpiryElement,
              editorRef,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }} />

        <TextField
          label='CVC'
          name='cvc'
          variant='outlined'
          required
          sx={{ width: 200, float: 'right' }}
          InputProps={{
            inputProps: {
              component: CardCvcElement,
              editorRef,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }} />
      </Stack>

      <LicenseCheck ref={licenseRef} />

      {error !== null && error.constructor.name !== "Object" && <Alert sx={{ marginTop: 1 }} severity='error'>{error.toString()}</Alert>}

      <Box sx={{ marginBottom: 7, marginTop: 2 }}>
        <Button style={{ float: 'right' }} variant='contained' endIcon={<SendIcon />}
                disabled={isLoading || !stripe || paymentStatus !== 'Not'} onClick={handleSubscribe}>
          {isLoading ? 'Processing…' : 'Subscribe'}
        </Button>
      </Box>
    </>
  );
};

export default React.memo(StripeCheckoutForm);