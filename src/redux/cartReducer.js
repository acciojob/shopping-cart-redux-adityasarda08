import { ADD_TO_CART, REMOVE_FROM_CART, INC_QTY, DEC_QTY } from './actionTypes';

const initialState = {
  items: []
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      const exists = state.items.find(
        (i) => i.productId === action.payload
      );
      if (exists) return state;

      return {
        ...state,
        items: [
          ...state.items,
          { productId: action.payload, qty: 1 }
        ]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter(
          (i) => i.productId !== action.payload
        )
      };

    case "INC_QTY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      };

    case "DEC_QTY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.productId === action.payload
              ? { ...i, qty: i.qty - 1 }
              : i
          )
          .filter((i) => i.qty > 0)
      };

    default:
      return state;
  }
}
