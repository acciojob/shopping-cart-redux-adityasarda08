import { combineReducers } from "redux";
import cart from "./cartReducer";
import wishlist from "./wishlistReducer";
import coupon from "./couponReducer";

export default combineReducers({
  cart,
  wishlist,
  coupon,
});