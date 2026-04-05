import { APPLY_COUPON, REMOVE_COUPON } from './actionTypes';

const initialState = {
  coupon: null, // { code, discount } | null
};

const couponReducer = (state = initialState, action) => {
  switch (action.type) {

    case APPLY_COUPON:
      return { ...state, coupon: action.payload };

    case REMOVE_COUPON:
      return { ...state, coupon: null };

    default:
      return state;
  }
};

export default couponReducer;