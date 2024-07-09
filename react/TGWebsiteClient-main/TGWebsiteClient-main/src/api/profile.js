import axios from '../utils/axios';

export async function changePassword(oldPassword, newPassword) {
  return await axios.post('/api/user/change-password', { oldPassword, newPassword });
}

export async function checkPassword(password) {
  return await axios.post('/api/user/check-password', { password });
}

export async function getLicenseInfo() {
  return await axios.post('/api/license/get-license-info');
}

export async function expireLicenseKey() {
  return await axios.post('/api/license/expire-license-key');
}