export default function couponReducer(state = null, action) {
  switch (action.type) {
    case "APPLY_COUPON":
      return action.payload;

    case "REMOVE_COUPON":
      return null;

    default:
      return state;
  }
}