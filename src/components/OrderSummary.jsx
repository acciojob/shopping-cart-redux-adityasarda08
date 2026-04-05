import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon, removeCoupon } from "../redux/actions";
import { PRODUCTS, COUPONS } from "../data/products";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const coupon = useSelector((state) => state.coupon.coupon);
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState({ text: "", type: "" });

  const subtotal = cartItems.reduce((sum, item) => {
    const p = PRODUCTS.find((x) => x.id === item.productId);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);

  const discountAmt = coupon
    ? Math.round((subtotal * coupon.discount) / 100)
    : 0;
  const total = subtotal - discountAmt;

  const handleApply = () => {
    const upper = code.trim().toUpperCase();
    if (!upper) {
      dispatch(removeCoupon());
      setMsg({ text: "", type: "" });
      return;
    }
    if (COUPONS[upper]) {
      dispatch(applyCoupon(upper, COUPONS[upper]));
      setMsg({
        text: `✓ Coupon applied! ${COUPONS[upper]}% off`,
        type: "success",
      });
    } else {
      setMsg({ text: "✕ Invalid coupon code", type: "error" });
    }
  };

  return (
    <div className="section-card">
      <div className="section-card-header">Order Summary</div>
      <div className="summary-content">
        <div className="coupon-box">
          <input
            className="coupon-input"
            type="text"
            placeholder="Promo code (e.g. SAVE10)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            data-testid="coupon-input"
          />
          <button
            className="btn-apply"
            onClick={handleApply}
            data-testid="apply-coupon"
          >
            Apply
          </button>
        </div>
        {msg.text && (
          <div className={`coupon-msg ${msg.type}`} data-testid="coupon-msg">
            {msg.text}
          </div>
        )}
        <div className="summary-row">
          <span>Subtotal</span>
          <span data-testid="subtotal">₹{subtotal.toLocaleString()}</span>
        </div>
        {coupon && (
          <div className="summary-row discount" data-testid="discount-row">
            <span>
              Coupon ({coupon.code}) −{coupon.discount}%
            </span>
            <span data-testid="discount-val">
              −₹{discountAmt.toLocaleString()}
            </span>
          </div>
        )}
        <div className="summary-row total">
          <span>Total</span>
          <span data-testid="total">₹{total.toLocaleString()}</span>
        </div>
       
        <button
          className="btn-checkout"
          data-testid="checkout-btn"
          onClick={() =>
            cartItems.length > 0 &&
            alert(`Order placed! Total: ₹${total.toLocaleString()}`)
          }
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
