import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
// import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from 'routes/paths';
// utils
import axios from '../utils/axios';
import localStorageAvailable from '../utils/localStorageAvailable';
//
import { isValidToken, setSession, jwtDecode } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'VERIFY') {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      // isAuthenticated: true,
      isAuthenticated: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  }
  if (action.type === 'UPDATE_USER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export const AuthContext = createContext(null);

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // const navigate = useNavigate();

  const storageAvailable = localStorageAvailable();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        // const response = await axios.get('/api/account/my-account');
        // const { user } = response.data;

        const user = jwtDecode(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const response = await axios.post('/api/user/login', {
      email,
      password,
    });
    const { accessToken, user } = response.data;

    if (user.emailVerifiedAt === null) {
      setSession(null);
      // navigate(PATH_AUTH.verify);
      window.location.href = PATH_AUTH.verify;
    } else {
      setSession(accessToken);

      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
    }
  }, []);

  // REGISTER
  const register = useCallback(async (data) => {
    const response = await axios.post('/api/user/register', data);
    // const { accessToken, user } = response.data;
    const { user } = response.data;

    // localStorage.setItem('accessToken', accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
  }, []);

  // Job Apply
  const applyJob = useCallback(async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);
    formData.append('linkedinProfile', data.linkedinProfile);
    formData.append('salary', data.salary);
    formData.append('startDate', data.startDate);
    formData.append('resume', data.resume);
    formData.append('passport', data.passport);
    formData.append('portfolioLink', data.portfolioLink);
    formData.append('ssn', data.ssn === '' ? 'null' : data.ssn);

    return await axios.post('/api/user/applyJob', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }, []);

  // Job Apply2
  const applyJob2 = useCallback(async (data) => {
    const formData = new FormData();
    formData.append('firstName', data.firstName);
    formData.append('lastName', data.lastName);
    formData.append('email', data.email);
    formData.append('phoneNumber', data.phoneNumber);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('country', data.country);
    formData.append('linkedinProfile', data.linkedinProfile);
    formData.append('salary', data.salary);
    formData.append('startDate', data.startDate);
    formData.append('resume', data.resume);
    formData.append('passport', data.passport);
    formData.append('selfie', data.selfie);
    formData.append('video', data.video);
    formData.append('portfolioLink', data.portfolioLink);

    return await axios.post('/api/user/applyJob2', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }, []);

  // VERIFY
  const verify = useCallback(async (code, email) => {
    const response = await axios.post('/api/user/verify', {
      code,
      email,
    });
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'VERIFY',
      payload: {
        user,
      },
    });
  }, []);

  // LOGOUT
  const logout = useCallback(() => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const updateUser = useCallback(async (user) => {
    const response = await axios.post('/api/user/update', {
      user,
    });
    const { success, accessToken } = response.data;
    if (success) {
      setSession(accessToken);
      dispatch({
        type: 'UPDATE_USER',
        payload: {
          user
        }
      });
    }
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      method: 'jwt',
      login,
      register,
      verify,
      applyJob,
      applyJob2,
      logout,
      updateUser,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, login, logout, register, applyJob, updateUser]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}