import React from 'react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

const ProductsPage = () => (
  <div>
    <div className="page-header">
      <h1>All Products</h1>
      <p>All Products that are available to order</p>
    </div>
    <div className="product-grid" data-testid="product-grid">
      {PRODUCTS.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
);

export default ProductsPage;