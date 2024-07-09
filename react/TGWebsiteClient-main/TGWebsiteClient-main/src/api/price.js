import axios from '../utils/axios';

export async function getCoinList() {
  return (await axios.post('/api/price/coinpayments/get-coin-list'));
}