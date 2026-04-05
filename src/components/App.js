import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from './Navbar';
import CartPanel from './CartPanel';
import ProductsPanel from "./ProductsPanel"; 
import "../styles/App.css";

const App = () => (
  <Provider store={store}>
    <Navbar />
    <div className="main-wrap">
      <ProductsPanel />
      <CartPanel />
    </div>
  </Provider>
);

export default App;