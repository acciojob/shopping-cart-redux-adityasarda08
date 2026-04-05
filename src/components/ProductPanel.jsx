import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductsPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);

  return (
    <div className="container">   {/* ✅ ADD THIS */}
      <div className="row">       {/* ✅ ADD THIS */}
        <div className="col-12">  {/* ✅ ADD THIS */}
          <h3>All Products</h3>

          {PRODUCTS.map((product) => {
            const inCart = cartItems.some((i) => i.productId === product.id);
            const inWish = wishItems.includes(product.id);

            return (
              <div key={product.id} className="card custom-card mb-3">
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <p className="card-text">{product.tag}</p>
                  <p className="card-text">Rs {product.price}</p>

                  <button
                    className="btn btn-primary"
                    onClick={() => dispatch(addToCart(product.id))}
                  >
                    Add To Cart
                  </button>

                  <button
                    className="btn btn-outline-danger"
                    onClick={() => dispatch(toggleWishlist(product.id))}
                  >
                    Wishlist
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


export default ProductsPanel;