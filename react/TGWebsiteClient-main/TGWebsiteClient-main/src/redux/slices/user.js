import keyBy from 'lodash/keyBy';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: null,
  mails: { byId: {}, allIds: [] },
  users: [],
};

const slice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET LABELS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // GET MAILS
    getMailsSuccess(state, action) {
      const mails = action.payload;

      state.isLoading = false;
      state.mails.byId = keyBy(mails, 'id');
      state.mails.allIds = Object.keys(state.mails.byId);
    },

    // GET MAIL
    getMailSuccess(state, action) {
      const mail = action.payload;

      state.mails.byId[mail.id] = mail;
      if (!state.mails.allIds.includes(mail.id)) {
        state.mails.allIds.push(mail.id);
      }
    },

    updateUserInfo(state, action) {
      const { email, licenseExpireAt, licensePeriod, paymentStatus } = action.payload;

      for (let user of state.users) {
        if (user.email === email) {
          user.licensePeriod = licensePeriod;
          user.licenseExpireAt = licenseExpireAt;
          user.paymentStatus = paymentStatus;
          break;
        }
      }

      state.users = [...state.users];
    },
  },
});

// ----------------------------------------------------------------------

export function getLabels() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/labels');
      dispatch(slice.actions.getLabelsSuccess(response.data.labels));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getAllUsers() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/getAllUsers');
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteUser(email) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/delete', { email });
      dispatch(slice.actions.getUsersSuccess(response.data.users));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function getMail(mailId) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/mail/mail', {
        params: { mailId },
      });
      dispatch(slice.actions.getMailSuccess(response.data.mail));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendEmail(data) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/email', data);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateUserInfo(email, licenseExpireAt, licensePeriod, paymentStatus) {
  return async (dispatch) => {
    dispatch(slice.actions.updateUserInfo({ email, licenseExpireAt, licensePeriod, paymentStatus }));
  };
}

export default slice.reducer;
