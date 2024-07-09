import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import productReducer from './slices/product';
import priceReducer from './slices/price';
import notificationReducer from './slices/notification';

// ----------------------------------------------------------------------

export const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

export const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout'],
};

const rootReducer = combineReducers({
  user: userReducer,
  product: persistReducer(productPersistConfig, productReducer),
  price: priceReducer,
  notification: notificationReducer
});

export default rootReducer;