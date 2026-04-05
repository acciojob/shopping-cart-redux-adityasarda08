import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  incQty, decQty, removeFromCart,
  applyCoupon, removeCoupon,
  addToCart, toggleWishlist
} from '../redux/actions';
import { PRODUCTS, COUPONS } from '../data/products';

const CartPanel = () => {
  const dispatch  = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const wishItems = useSelector(state => state.wishlist.items);
  const coupon    = useSelector(state => state.coupon.coupon);
  const [code, setCode] = useState('');
  const [msg,  setMsg]  = useState({ text: '', type: '' });

  const subtotal    = cartItems.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
  const discountAmt = coupon ? Math.round(subtotal * coupon.discount / 100) : 0;
  const total       = subtotal - discountAmt;

  const handleApply = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) { dispatch(removeCoupon()); setMsg({ text: '', type: '' }); return; }
    if (COUPONS[upper]) {
      dispatch(applyCoupon(upper, COUPONS[upper]));
      setMsg({ text: `✓ ${COUPONS[upper]}% off applied!`, type: 'success' });
    } else {
      setMsg({ text: '✕ Invalid coupon code', type: 'error' });
    }
  };

  const wishlistProducts = PRODUCTS.filter(p => wishItems.includes(p.id));

  return (
    <>
      {/* ── CART: items LEFT + summary RIGHT ── */}
      <div className="panel" style={{ marginTop: '24px' }}>
        <div className="panel-header">
          <span>🛒 Cart</span>
          <span className="count-badge">{cartItems.length} item{cartItems.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-panel-inner">
          {/* LEFT – cart items */}
          <div className="cart-items-col">
            {cartItems.length === 0 ? (
              <div className="panel-empty">
                <div className="empty-icon">🛒</div>
                Your cart is empty
              </div>
            ) : (
              cartItems.map(item => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div className="cart-item-row" key={item.productId} data-testid={`cart-item-${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '7px', flexShrink: 0 }}
                    />
                    <div className="cart-item-info">
                      <div className="cart-item-name">{product.name}</div>
                      <div className="cart-item-tag">{product.tag}</div>
                      <div className="cart-item-price">Rs {(product.price * item.qty).toLocaleString()}</div>
                    </div>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => dispatch(decQty(product.id))} data-testid={`dec-qty-${product.id}`}>−</button>
                      <span className="qty-num" data-testid={`qty-${product.id}`}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => dispatch(incQty(product.id))} data-testid={`inc-qty-${product.id}`}>+</button>
                    </div>
                    <button
                      className={`btn-wish ${wishItems.includes(product.id) ? 'active' : ''}`}
                      onClick={() => dispatch(toggleWishlist(product.id))}
                      data-testid={`wishlist-${product.id}`}
                      title={wishItems.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      {wishItems.includes(product.id) ? '❤️' : '🤍'}
                    </button>
                    <button
                      className="btn-remove-cart-item"
                      onClick={() => dispatch(removeFromCart(product.id))}
                      data-testid={`remove-${product.id}`}
                    >Remove</button>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT – order summary */}
          <div className="cart-summary-col">
            <div className="order-summary" style={{ borderTop: 'none' }}>
              <div className="coupon-row">
                <input
                  className="coupon-input"
                  type="text"
                  placeholder="Promo code (e.g. SAVE10)"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  data-testid="coupon-input"
                />
                <button className="btn-apply" onClick={handleApply} data-testid="apply-coupon">Apply</button>
              </div>
              {msg.text && (
                <div className={`coupon-msg ${msg.type}`} data-testid="coupon-msg">{msg.text}</div>
              )}
              <div className="summary-line">
                <span>Subtotal</span>
                <span data-testid="subtotal">Rs {subtotal.toLocaleString()}</span>
              </div>
              {coupon && (
                <div className="summary-line discount" data-testid="discount-row">
                  <span>Coupon ({coupon.code}) −{coupon.discount}%</span>
                  <span data-testid="discount-val">−Rs {discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="summary-line total">
                <span>Total</span>
                <span data-testid="total">Rs {total.toLocaleString()}</span>
              </div>
              <button
                className="btn-checkout"
                data-testid="checkout-btn"
                onClick={() => cartItems.length > 0 && alert(`Order placed!\nTotal: Rs ${total.toLocaleString()}`)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── WISHLIST PANEL ── */}
      <div className="panel" style={{ marginTop: '16px' }}>
        <div className="panel-header" style={{ background: '#4a5568' }}>
          <span>❤️ Wishlist</span>
          <span className="count-badge">{wishlistProducts.length}</span>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="panel-empty">
            <div className="empty-icon">🤍</div>
            Your wishlist is empty
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistProducts.map(product => {
              const inCart = cartItems.some(i => i.productId === product.id);
              return (
                <div className="wish-card" key={product.id} data-testid={`wish-item-${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '6px', flexShrink: 0 }}
                  />
                  <div className="wish-item-info" style={{ flex: 1, minWidth: 0 }}>
                    <div className="wish-item-name">{product.name}</div>
                    <div className="wish-item-tag">{product.tag}</div>
                    <div className="wish-item-price">Rs {product.price.toLocaleString()}</div>
                  </div>
                  <div className="wish-actions">
                    <button
                      className={`btn-wish-cart ${inCart ? 'in-cart' : ''}`}
                      onClick={() => !inCart && dispatch(addToCart(product.id))}
                      data-testid={`wish-add-cart-${product.id}`}
                      disabled={inCart}
                    >
                      {inCart ? '✓ In Cart' : 'Add to Cart'}
                    </button>
                    <button
                      className="btn-wish-remove"
                      onClick={() => dispatch(toggleWishlist(product.id))}
                      data-testid={`wish-remove-${product.id}`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default CartPanel;