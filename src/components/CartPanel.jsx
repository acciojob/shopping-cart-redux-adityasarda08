import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incQty,
  decQty,
  removeFromCart,
  toggleWishlist,
  applyCoupon,
  removeCoupon,
} from "../redux/actions";
import { PRODUCTS, COUPONS } from "../data/products";

const CartPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);
  const coupon = useSelector((state) => state.coupon);

  const [code, setCode] = useState("");

  const subtotal = cartItems.reduce((sum, item) => {
    const product = PRODUCTS.find((p) => p.id === item.productId);
    return sum + product.price * item.qty;
  }, 0);

  const discount = coupon ? Math.floor((subtotal * coupon.discount) / 100) : 0;
  const total = subtotal - discount;

  return (
    <div className="container">
      {/* CART */}
      <h3>Cart</h3>

      {cartItems.map((item) => {
        const product = PRODUCTS.find((p) => p.id === item.productId);

        return (
          <div key={item.productId} className="custom-card">
            <div className="card-body">
              {/* ✅ IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "80px", height: "80px" }}
              />

              <h4>{product.name}</h4>

              <button onClick={() => dispatch(decQty(product.id))}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(incQty(product.id))}>+</button>

              <button onClick={() => dispatch(removeFromCart(product.id))}>
                Remove
              </button>

              <button onClick={() => dispatch(toggleWishlist(product.id))}>
                Add To Wishlist
              </button>
            </div>
          </div>
        );
      })}

      {/* WISHLIST */}
      <h3>Wishlist</h3>

      {wishItems.map((id) => {
        const product = PRODUCTS.find((p) => p.id === id);

        return (
          <div key={id} className="custom-card">
            <div className="card-body">
              <h4>{product.name}</h4>

              <button onClick={() => dispatch(toggleWishlist(product.id))}>
                Remove
              </button>
            </div>
          </div>
        );
      })}

      {/* COUPON */}
      <h3>Apply Coupon</h3>

      <input value={code} onChange={(e) => setCode(e.target.value)} />

      <button
        onClick={() => {
          const c = COUPONS[code];
          if (c) dispatch(applyCoupon(code, c));
        }}
      >
        Apply
      </button>

      <button onClick={() => dispatch(removeCoupon())}>Remove Coupon</button>

      {/* TOTAL */}
      <h3>Total: Rs {total}</h3>
    </div>
  );
};

export default CartPanel;
