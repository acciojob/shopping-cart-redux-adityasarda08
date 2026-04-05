import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const cartItems    = useSelector(state => state.cart.items);
  const wishItems    = useSelector(state => state.wishlist.items);
  const cartQty      = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const wishCount    = wishItems.length;
  const { pathname } = useLocation();

  const tab = (to, label, count) => (
    <Link to={to} className={`nav-tab ${pathname === to ? 'active' : ''}`}>
      {label}
      {count > 0 && <span className="badge">{count}</span>}
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="nav-logo">🛍 ShopCart</div>
      <div className="nav-tabs">
        {tab('/',          'Products',  0)}
        {tab('/cart',      'Cart',      cartQty)}
        {tab('/wishlist',  'Wishlist',  wishCount)}
      </div>
    </nav>
  );
};

export default Navbar;