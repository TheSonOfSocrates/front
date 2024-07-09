// routes
import { PATH_DASHBOARD } from './routes/paths';

// API
// ----------------------------------------------------------------------

export const HOST_API_KEY = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';
export const WS_SERVER_URL = process.env.REACT_APP_WS_SERVER_URL || 'ws://localhost:5000';

export const MAP_API = process.env.REACT_APP_MAPBOX_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.general.app; // as '/dashboard/app'

export const STRIPE_API_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY || 'pk_test_51MkqZLEyA0PrOszxZqvIFK2hXyg5qnVwMFFnaf6w3jhJLyw5bvOC4Tm8sXoUVmgdTj81qLla0jaZoilHrSOxtrDf00LmjuH3UB';

export const PAYPAL_API_KEY = process.env.REACT_APP_PAYPAL_CLIENT_ID || 'AT0gP5vy-0UEUg-mzncHxrI1z3Uk_YjeRxCLHKXm6Ooi5nH1072IMMbGF_nPqlExCgx-ZTw5rZmdpLSj';

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  H_MOBILE: 64,
  H_MAIN_DESKTOP: 88,
  H_DASHBOARD_DESKTOP: 92,
  H_DASHBOARD_DESKTOP_OFFSET: 92 - 32,
};

export const NAV = {
  W_BASE: 260,
  W_DASHBOARD: 280,
  W_DASHBOARD_MINI: 88,
  //
  H_DASHBOARD_ITEM: 48,
  H_DASHBOARD_ITEM_SUB: 36,
  //
  H_DASHBOARD_ITEM_HORIZONTAL: 32,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};
