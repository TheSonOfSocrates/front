import axios from '../utils/axios';

export async function getAccessCount() {
  return (await axios.post('/api/admin/access-count')).data;
}

export async function giveLicenseKey(option) {
  return (await axios.post('/api/admin/give-license-key', option));
}