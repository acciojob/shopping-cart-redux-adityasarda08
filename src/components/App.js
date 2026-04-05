import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from './Navbar';
import ProductPanel from './ProductPanel';
import CartPanel from './CartPanel';
import "../styles/App.css";

const App = () => (
  <Provider store={store}>
    <Navbar />
    <ProductPanel />
    <CartPanel />
  </Provider>
);

export default App;