import { combineReducers } from 'redux';
import cartReducer     from './cartReducer';
import wishlistReducer from './wishlistReducer';
import couponReducer from './couponReducer';

const rootReducer = combineReducers({
  cart:     cartReducer,
  wishlist: wishlistReducer,
  coupon:   couponReducer,
});

export default rootReducer;