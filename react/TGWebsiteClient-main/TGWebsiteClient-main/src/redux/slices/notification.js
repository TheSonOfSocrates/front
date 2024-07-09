import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isInitialized: false,
  notifications: [],
};

const slice = createSlice({
  name: 'notification',
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

    setNotifications(state, action) {
      state.notifications = action.payload;
      state.isInitialized = true;
    },

    addNotification(state, action) {
      state.notifications = [...state.notifications, action.payload];
    },

    deleteNotifications(state, action) {
      state.notifications = state?.notifications.filter(notification =>
        !action.payload.includes(notification._id));

      state.notifications = [...state.notifications];
    },

    viewNotification(state, action) {
      for (let notification of state.notifications) {
        if (notification._id === action.payload) {
          notification.status = 'Read';
          break;
        }
      }
      state.notifications = [...state.notifications];
    },

    viewAllNotification(state, action) {
      for (let notification of state.notifications) {
        notification.status = 'Read';
      }
      state.notifications = [...state.notifications];
    },
  },
});

// ----------------------------------------------------------------------
export function getNotifications() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/user/get-notifications');
      dispatch(slice.actions.setNotifications(response.data.notifications));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function addNotification(notification) {
  return async (dispatch) => {
    dispatch(slice.actions.addNotification(notification));
  };
}

export function deleteNotifications(idList) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/delete-notifications', { idList });
      if (response.status === 200 && response.data.success) {
        dispatch(slice.actions.deleteNotifications(idList));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function viewNotification(id) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/view-notification', { id });
      if (response.status === 200 && response.data.success) {
        dispatch(slice.actions.viewNotification(id));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function viewAllNotification() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/view-all-notification');
      if (response.status === 200 && response.data.success) {
        dispatch(slice.actions.viewAllNotification());
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function sendNotifications(emailList, notiMsg) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/user/send-notifications', { emailList, notiMsg });
      if (response.status === 200 && response.data.success) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export default slice.reducer;