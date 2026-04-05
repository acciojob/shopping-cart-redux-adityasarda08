import { createStore } from 'redux';
import rootReducer from './rootReducer';

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__?.() // enables Redux DevTools if installed
);

export default store;