import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartQty   = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="text-center w-100">
        <a className="navbar-brand" href="#">Shopping Cart</a>
        <span className="badge badge-light ml-2">{cartQty}</span>
      </div>
    </nav>
  );
};

export default Navbar;