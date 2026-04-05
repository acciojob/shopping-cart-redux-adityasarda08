import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ProductsPage from '../pages/ProductsPage';
import CartPage     from '../pages/CartPage';
import Navbar from './Navbar';
import "../styles/App.css";
import WishlistPage from '../pages/WishlistPage';

const App = () => (
  <BrowserRouter>
    <Navbar />
    <main className="main-content">
      <Switch>
          <Route exact path="/"         component={ProductsPage} />
          <Route path="/cart"           component={CartPage} />
          <Route path="/wishlist"       component={WishlistPage} /> 
      </Switch>
    </main>
  </BrowserRouter>
);

export default App;