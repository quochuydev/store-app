/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";

import styles from "./style.module.css";

export default function Products({ products, afterAddToCart }) {
  return (
    <section className="product" id="product">
      <h1 className="heading">
        latest <span>products</span>
      </h1>
      <div className="box-container">
        {products.map((e, i) => (
          <Product key={i} product={e} afterAddToCart={afterAddToCart} />
        ))}
      </div>
    </section>
  );
}

function Product({ product, afterAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="box">
      <span className="discount">
        {Math.floor((product.original_price / product.price) * 100)}
      </span>
      <div className="icons">
        <a href="#" className="fas fa-heart" />
        <a href="#" className="fas fa-share" />
        <a href="#" className="fas fa-eye" />
      </div>
      <img
        src={
          product.image ||
          `https://ui-avatars.com/api/?name=${product.title}&size=600`
        }
        alt={product.title}
      />
      <h3>{product.title}</h3>
      <div className="stars">
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star-half-alt" />
      </div>
      <div className="price">
        {" "}
        {product.original_price}
        <span>{product.price}</span>{" "}
      </div>
      <div className="quantity">
        <span>quantity : </span>
        <input
          type="number"
          min={1}
          max={1000}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <a
        className={styles.btn}
        onClick={async () => {
          await axios.post(process.env.SERVER_URL + "/api/cart/add", {
            quantity,
            id: product._id,
          });
          return afterAddToCart();
        }}
      >
        add to cart
      </a>
    </div>
  );
}
