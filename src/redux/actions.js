import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  INC_QTY,
  DEC_QTY,
  TOGGLE_WISHLIST,
  APPLY_COUPON,
  REMOVE_COUPON,
} from "./actionTypes";

export const addToCart = (id) => ({ type: ADD_TO_CART, payload: id });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const incQty = (id) => ({ type: INC_QTY, payload: id });
export const decQty = (id) => ({ type: DEC_QTY, payload: id });
export const toggleWishlist = (id) => ({ type: TOGGLE_WISHLIST, payload: id });

export const applyCoupon = (code, discount) => ({
  type: APPLY_COUPON,
  payload: { code, discount },
});

export const removeCoupon = () => ({ type: REMOVE_COUPON });