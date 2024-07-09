import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: null,
  plans: [],
  paymentStatus: 'Not',
  selectedPlanId: '',
  stripePaymentIntent: '',
  licenseKey: '',
  priceDlgOpen: false,
};

const slice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.error = null;
      state.isLoading = true;
    },

    stopLoading(state) {
      state.isLoading = false;
    },

    // HAS ERROR
    setError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
      if (action.payload !== null)
        state.paymentStatus = 'Not';
    },

    setPlans(state, action) {
      state.plans = action.payload;
    },

    setPaymentStatus(state, action) {
      state.paymentStatus = action.payload;
    },

    setLicenseKey(state, action) {
      state.licenseKey = action.payload;
    },

    setSelectedPlanId(state, action) {
      state.selectedPlanId = action.payload;
    },

    setStripeClientSecret(state, action) {
      state.isLoading = false;
      state.clientSecret = action.payload;
    },

    setStripePaymentIntent(state, action) {
      state.stripePaymentIntent = action.payload;
    },

    cancelOrder(state, action) {
      state.paymentStatus = 'Not';
      state.selectedPlanId = '';
    },

    setPriceDlgOpen(state, action) {
      state.priceDlgOpen = action.payload;
    },
  },
});

export function getPlans() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/price/plans');
      dispatch(slice.actions.setPlans(response.data.plans));
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function getPaymentInfo() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/price/payment-info');
      dispatch(slice.actions.setPaymentStatus(response.data.paymentStatus));
      dispatch(slice.actions.setSelectedPlanId(response.data.planId));
      dispatch(slice.actions.stopLoading());
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function createStripePaymentIntent(options) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/price/stripe/create-payment-intent', options);
      dispatch(slice.actions.setStripePaymentIntent(response.data.paymentIntent));
      dispatch(slice.actions.setPaymentStatus('Ordered'));
      dispatch(slice.actions.stopLoading());

      return response.data.paymentIntent.client_secret;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function setError(errorMsg) {
  return async (dispatch) => {
    dispatch(slice.actions.setError(errorMsg));
  };
}

export function setSelectedPlanId(planId) {
  return async (dispatch) => {
    dispatch(slice.actions.setSelectedPlanId(planId));
  };
}

export function setPaymentStatus(status) {
  return async (dispatch) => {
    dispatch(slice.actions.setPaymentStatus(status));
  };
}

export function setLicenseKey(key) {
  return async (dispatch) => {
    dispatch(slice.actions.setLicenseKey(key));
  };
}

export function confirmPaypalPayment(option) {
  return (dispatch) => {
    try {
      axios.post('/api/price/paypal/confirm-payment', option);
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function createCoinTransaction(option) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/price/coinpayments/create-transaction', option);

      dispatch(slice.actions.stopLoading());
      dispatch(slice.actions.setPaymentStatus('Ordered'));
      return response;
    } catch (error) {
      dispatch(slice.actions.setError(error));
    }
  };
}

export function cancelOrder() {
  return async (dispatch) => {
    const response = await axios.post('/api/price/cancel-order');
    if (response.status === 200 && response.data.success) {
      dispatch(slice.actions.cancelOrder());
    }
  };
}

export function setPriceDlgOpen(isOpen) {
  return async (dispatch) => {
    dispatch(slice.actions.setPriceDlgOpen(isOpen));
  };
}

export default slice.reducer;