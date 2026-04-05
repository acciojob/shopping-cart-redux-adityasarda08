import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductsPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container-fluid mt-3">
      <h3>All Products</h3>
      <div className="row">
        {PRODUCTS.map((product) => {
          const inCart = cartItems.some((i) => i.productId === product.id);
          const inWish = wishItems.includes(product.id);
          return (
            <div key={product.id} className="card custom-card mb-3">
              {" "}
              {/* key + custom-card directly */}
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.name}
                />
                <div className="card-body d-flex flex-column">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-text text-muted">{product.tag}</p>
                  <p className="card-text font-weight-bold">
                    Rs {product.price.toLocaleString()}
                  </p>
                  <div className="mt-auto">
                    <button
                      className="btn btn-primary mr-2"
                      onClick={() => dispatch(addToCart(product.id))}
                      disabled={inCart}
                    >
                      {inCart ? "Added" : "Add To Cart"}
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => dispatch(toggleWishlist(product.id))}
                    >
                      {inWish ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsPanel;
