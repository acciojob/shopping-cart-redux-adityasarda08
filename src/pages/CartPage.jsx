import React from 'react';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';

const CartPage = () => {
  const cartItems = useSelector(state => state.cart.items);

  return (
    <div>
      <div className="page-header">
        <h1>Shopping Cart</h1>
      </div>
      <div className="cart-layout">
        {/* LEFT – Cart Items */}
        <div className="section-card">
          <div className="section-card-header">
            <span>Cart Items</span>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
              {cartItems.length} item{cartItems.length !== 1 ? 's' : ''}
            </span>
          </div>
          {cartItems.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🛒</div>
              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map(item => <CartItem key={item.productId} item={item} />)
          )}
        </div>

        {/* RIGHT – Order Summary */}
        <OrderSummary />
      </div>
    </div>
  );
};

export default CartPage;