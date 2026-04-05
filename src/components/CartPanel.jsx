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
    <div className="container-fluid mt-4">
      <div className="row">
        {/* LEFT COLUMN */}
        <div className="col-md-8">

          {/* Cart Section */}
          <h5>Cart ({cartItems.length})</h5>
          <div className="cart-items-list">
            {cartItems.length === 0 ? (
              <p className="text-muted">Your cart is empty.</p>
            ) : (
              cartItems.map(item => {
                const product = PRODUCTS.find(p => p.id === item.productId);
                if (!product) return null;
                return (
                  <div key={item.productId}>
                    <div className="card custom-card mb-3">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                            className="mr-3"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{product.name}</h6>
                            <small className="text-muted">{product.tag}</small>
                            <div>Rs {(product.price * item.qty).toLocaleString()}</div>
                          </div>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => dispatch(decQty(product.id))}
                            >−</button>
                            <span className="mx-2">{item.qty}</span>
                            <button
                              className="btn btn-sm btn-outline-secondary"
                              onClick={() => dispatch(incQty(product.id))}
                            >+</button>
                          </div>
                          <button
                            className="btn btn-sm btn-danger ml-3"
                            onClick={() => dispatch(removeFromCart(product.id))}
                          >Remove</button>
                          <button
                            className="btn btn-sm btn-outline-danger ml-2"
                            onClick={() => dispatch(toggleWishlist(product.id))}
                          >
                            {wishItems.includes(product.id) ? '❤️' : '🤍'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Wishlist Section */}
          <h5 className="mt-4">Wishlist ({wishlistProducts.length})</h5>
          <div className="wishlist-items-list">
            {wishlistProducts.length === 0 ? (
              <p className="text-muted">Your wishlist is empty.</p>
            ) : (
              wishlistProducts.map(product => {
                const inCart = cartItems.some(i => i.productId === product.id);
                return (
                  <div key={product.id}>
                    <div className="card custom-card mb-3">
                      <div className="card-body">
                        <div className="d-flex align-items-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }}
                            className="mr-3"
                          />
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{product.name}</h6>
                            <small className="text-muted">{product.tag}</small>
                            <div>Rs {product.price.toLocaleString()}</div>
                          </div>
                          <button
                            className="btn btn-primary mr-2"
                            onClick={() => !inCart && dispatch(addToCart(product.id))}
                            disabled={inCart}
                          >
                            {inCart ? 'In Cart' : 'Add To Cart'}
                          </button>
                          <button
                            className="btn btn-outline-danger"
                            onClick={() => dispatch(toggleWishlist(product.id))}
                          >Remove</button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN – Order Summary */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="input-group mb-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code (e.g. SAVE10)"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                />
                <div className="input-group-append">
                  <button className="btn btn-outline-secondary" onClick={handleApply}>Apply</button>
                </div>
              </div>
              {msg.text && (
                <div className={`alert alert-${msg.type === 'success' ? 'success' : 'danger'} py-1`}>
                  {msg.text}
                </div>
              )}
              <hr />
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>Rs {subtotal.toLocaleString()}</span>
              </div>
              {coupon && (
                <div className="d-flex justify-content-between text-success">
                  <span>Discount ({coupon.discount}%)</span>
                  <span>−Rs {discountAmt.toLocaleString()}</span>
                </div>
              )}
              <div className="d-flex justify-content-between font-weight-bold mt-2">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
              <button
                className="btn btn-success btn-block mt-3"
                onClick={() => cartItems.length > 0 && alert(`Order placed!\nTotal: Rs ${total.toLocaleString()}`)}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPanel;
