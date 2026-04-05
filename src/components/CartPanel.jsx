import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  incQty,
  decQty,
  removeFromCart,
  toggleWishlist,
} from "../redux/actions";
import { PRODUCTS } from "../data/products";

const CartPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);

  return (
    <div>

      {/* CART */}
      <h3>Cart</h3>

      {cartItems.map((item) => {
        const product = PRODUCTS.find(p => p.id === item.productId);

        return (
          <div key={item.productId} className="custom-card">
            <div className="card-body">

              <h4>{product.name}</h4>

              {/* IMPORTANT: ALL buttons MUST have class btn */}
              <button className="btn" onClick={() => dispatch(incQty(product.id))}>
                +
              </button>

              <button className="btn" onClick={() => dispatch(decQty(product.id))}>
                -
              </button>

              <button className="btn" onClick={() => dispatch(removeFromCart(product.id))}>
                Remove
              </button>

              <button className="btn" onClick={() => dispatch(toggleWishlist(product.id))}>
                Add To Wishlist
              </button>

            </div>
          </div>
        );
      })}

      {/* WISHLIST */}
      <h3>Wishlist</h3>

      {wishItems.map((id) => {
        const product = PRODUCTS.find(p => p.id === id);

        return (
          <div key={id} className="custom-card">
            <div className="card-body">

              <h4>{product.name}</h4>

              <button className="btn" onClick={() => dispatch(toggleWishlist(product.id))}>
                Remove
              </button>

            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CartPanel;