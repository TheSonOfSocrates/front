import axios from 'axios';
// config
import { HOST_API_KEY } from '../config-global';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------
// axios.defaults.headers.common = { 'Authorization': `bearer ${localStorage.getItem('accessToken')}` };

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
  },
);

export default axiosInstance;