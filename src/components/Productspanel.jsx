import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, toggleWishlist } from "../redux/actions";
import { PRODUCTS } from "../data/products";

const ProductsPanel = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const wishItems = useSelector((state) => state.wishlist.items);

  // Only show products NOT already in the cart
  const visibleProducts = PRODUCTS.filter(
    (p) => !cartItems.some((i) => i.productId === p.id),
  );

  return (
    <div>
      <div className="section-title">All Products</div>
      <div className="section-sub">
        All Products that are available to order
      </div>
      <div className="product-grid">
        {visibleProducts.map((product) => {
          const inWish = wishItems.includes(product.id);
          return (
            <div
              className="p-card"
              key={product.id}
              data-testid={`product-${product.id}`}
            >
              <img src={product.image} alt={product.name} />
              <div className="p-card-body">
                <div className="p-name">{product.name}</div>
                <div className="p-tag">{product.tag}</div>
                <div className="p-price">
                  Rs {product.price.toLocaleString()}
                </div>
                <div className="p-actions">
                  <button
                    className="btn-add-cart"
                    onClick={() => dispatch(addToCart(product.id))}
                    data-testid={`add-to-cart-${product.id}`}
                  >
                    Add To Cart
                  </button>
                  <button
                    className={`btn-wish ${inWish ? "active" : ""}`}
                    onClick={() => dispatch(toggleWishlist(product.id))}
                    data-testid={`wishlist-${product.id}`}
                    title={inWish ? "Remove from Wishlist" : "Add to Wishlist"}
                  >
                    {inWish ? "❤️" : "🤍"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {visibleProducts.length === 0 && (
          <p className="section-sub">
            All products have been added to your cart!
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductsPanel;
