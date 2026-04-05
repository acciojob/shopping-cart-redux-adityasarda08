import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from './Navbar';
import "../styles/App.css";
import CartPanel from './CartPanel';
import ProductPanel from './ProductPanel';

const App = () => (
  <Provider store={store}>
    <Navbar />
    <div className="main-wrap">
      <ProductPanel />
      <CartPanel />
    </div>
  </Provider>
);

export default App;