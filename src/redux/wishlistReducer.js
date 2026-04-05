import { TOGGLE_WISHLIST } from './actionTypes';

const initialState = {
  items: [], // [productId]
};

const wishlistReducer = (state = initialState, action) => {
  switch (action.type) {

    case TOGGLE_WISHLIST: {
      const exists = state.items.includes(action.payload);
      return {
        ...state,
        items: exists
          ? state.items.filter(id => id !== action.payload)
          : [...state.items, action.payload],
      };
    }

    default:
      return state;
  }
};

export default wishlistReducer;