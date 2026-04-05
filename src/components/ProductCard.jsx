import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/actions';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const wishItems = useSelector(state => state.wishlist.items);

  const inCart = cartItems.some(i => i.productId === product.id);
  const inWish = wishItems.includes(product.id);

  const handleAddToCart = () => {
    if (!inCart) dispatch(addToCart(product.id));
  };

  const handleWishlist = () => {
    dispatch(toggleWishlist(product.id));
  };

  return (
    <div className="product-card" data-testid={`product-${product.id}`}>
      <div className="product-img" style={{ background: product.color }}>
        <span style={{ fontSize: '5rem' }}>{product.emoji}</span>
      </div>
      <div className="product-info">
        <div className="product-name">{product.name}</div>
        <div className="product-tag">{product.tag}</div>
        <div className="product-price">₹{product.price.toLocaleString()}</div>
        <div className="product-actions">
          <button
            className={`btn-cart ${inCart ? 'in-cart' : ''}`}
            onClick={handleAddToCart}
            data-testid={`add-to-cart-${product.id}`}
          >
            {inCart ? '✓ Added' : 'Add To Cart'}
          </button>
          <button
            className={`btn-wish ${inWish ? 'active' : ''}`}
            onClick={handleWishlist}
            data-testid={`wishlist-${product.id}`}
          >
            {inWish ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;