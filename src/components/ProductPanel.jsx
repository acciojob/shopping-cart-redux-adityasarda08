import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>All Products</h3>

          {PRODUCTS.map((product) => {
            const inCart = cartItems.some((i) => i.productId === product.id);
            const inWish = wishItems.includes(product.id);

            return (
              <div key={product.id} className="custom-card">
                <div className="card-body">
                  {/* ✅ IMAGE ADDED */}
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: "100px", height: "100px" }}
                  />

                  <h4>{product.name}</h4>
                  <p>{product.tag}</p>
                  <p>Rs {product.price}</p>

                  <button onClick={() => dispatch(addToCart(product.id))}>
                    Add To Cart
                  </button>

                  <button onClick={() => dispatch(toggleWishlist(product.id))}>
                    Add To Wishlist
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductPanel;
