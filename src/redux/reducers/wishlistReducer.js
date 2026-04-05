const initialState = { items: [] };

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case "TOGGLE_WISHLIST":
      return state.items.includes(action.payload)
        ? { items: state.items.filter(id => id !== action.payload) }
        : { items: [...state.items, action.payload] };

    default:
      return state;
  }
}