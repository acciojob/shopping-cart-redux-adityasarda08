import React from 'react';
import { useDispatch } from 'react-redux';
import { incQty, decQty, removeFromCart } from '../redux/actions';
import { PRODUCTS } from '../data/products';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const product  = PRODUCTS.find(p => p.id === item.productId);
  if (!product) return null;

  return (
    <div className="cart-item" data-testid={`cart-item-${product.id}`}>
      <div className="cart-item-img" style={{ background: product.color }}>
        <span style={{ fontSize: '2rem' }}>{product.emoji}</span>
      </div>
      <div className="cart-item-info">
        <div className="cart-item-name">{product.name}</div>
        <div className="cart-item-tag">{product.tag}</div>
        <div className="cart-item-price">₹{(product.price * item.qty).toLocaleString()}</div>
      </div>
      <div className="qty-controls">
        <button
          className="qty-btn"
          onClick={() => dispatch(decQty(product.id))}
          data-testid={`dec-qty-${product.id}`}
        >−</button>
        <span className="qty-display" data-testid={`qty-${product.id}`}>{item.qty}</span>
        <button
          className="qty-btn"
          onClick={() => dispatch(incQty(product.id))}
          data-testid={`inc-qty-${product.id}`}
        >+</button>
      </div>
      <button
        className="btn-remove"
        onClick={() => dispatch(removeFromCart(product.id))}
        data-testid={`remove-${product.id}`}
        title="Remove"
      >✕</button>
    </div>
  );
};

export default CartItem;