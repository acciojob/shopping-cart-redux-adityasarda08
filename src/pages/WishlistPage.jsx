import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, toggleWishlist } from '../redux/actions';
import { PRODUCTS } from '../data/products';

const WishlistPage = () => {
  const dispatch  = useDispatch();
  const wishItems = useSelector(state => state.wishlist.items);
  const cartItems = useSelector(state => state.cart.items);

  const wishlistProducts = PRODUCTS.filter(p => wishItems.includes(p.id));

  return (
    <div>
      <div className="page-header">
        <h1>My Wishlist</h1>
      </div>
      <div className="section-card" style={{ padding: '20px' }}>
        {wishlistProducts.length === 0 ? (
          <div className="empty-state">
            <div className="icon">🤍</div>
            <p>Your wishlist is empty</p>
          </div>
        ) : (
          <div className="product-grid" data-testid="wishlist-grid">
            {wishlistProducts.map(product => {
              const inCart = cartItems.some(i => i.productId === product.id);
              return (
                <div className="product-card" key={product.id} data-testid={`wish-item-${product.id}`}>
                  <div className="product-img" style={{ background: product.color, height: '140px' }}>
                    <span style={{ fontSize: '4rem' }}>{product.emoji}</span>
                  </div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-tag">{product.tag}</div>
                    <div className="product-price">₹{product.price.toLocaleString()}</div>
                    <div className="product-actions">
                      <button
                        className={`btn-cart ${inCart ? 'in-cart' : ''}`}
                        onClick={() => !inCart && dispatch(addToCart(product.id))}
                        data-testid={`wish-add-cart-${product.id}`}
                      >
                        {inCart ? '✓ In Cart' : 'Add To Cart'}
                      </button>
                      <button
                        className="btn-wish active"
                        onClick={() => dispatch(toggleWishlist(product.id))}
                        data-testid={`wish-remove-${product.id}`}
                      >
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;