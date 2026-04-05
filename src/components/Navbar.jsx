import React from 'react';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector(state => state.cart.items);
  const cartQty   = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <nav className="top-navbar">
      <div className="nav-brand">
        🛍 ShopCart
      </div>
      <button className="nav-cart-btn">
        🛒 Cart
        {cartQty > 0 && <span className="badge">{cartQty}</span>}
      </button>
    </nav>
  );
};

export default Navbar;