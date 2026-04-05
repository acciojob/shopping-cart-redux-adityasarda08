import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductPanel = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h3>All Products</h3>   {/* MUST BE HERE */}

        {PRODUCTS.map((product) => (
          <div key={product.id} className="custom-card card">
            <div className="card-body">

              <img src={product.image} width="100" />

              <h4>{product.name}</h4>
              <p>{product.tag}</p>
              <p>Rs {product.price}</p>

              {/* FIRST BUTTON MUST BE btn-primary */}
              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(product.id))}
              >
                Add To Cart
              </button>

              {/* SECOND BUTTON */}
              <button
                className="btn"
                onClick={() => dispatch(toggleWishlist(product.id))}
              >
                Add To Wishlist
              </button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPanel;