import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div>
      <h3>All Products</h3>

      {PRODUCTS.map((product) => (
        <div key={product.id} className="custom-card card">
          <div className="card-body">

            {/* IMAGE */}
            <img src={product.image} alt={product.name} width="100" />

            <h4>{product.name}</h4>
            <p>{product.tag}</p>
            <p>Rs {product.price}</p>

            {/* MUST BE btn-primary */}
            <button
              className="btn btn-primary"
              onClick={() => dispatch(addToCart(product.id))}
            >
              Add To Cart
            </button>

            {/* Wishlist */}
            <button
              className="btn btn-danger"
              onClick={() => dispatch(toggleWishlist(product.id))}
            >
              Add To Wishlist
            </button>

          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductPanel;