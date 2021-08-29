/* eslint-disable @next/next/link-passhref */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";

import styles from "./style.module.css";

export default function Products({ products, afterAddToCart }) {
  return (
    <section className="product" id="product">
      <h1 className="heading">
        latest <span>products</span>
      </h1>
      <div className="box-container">
        {products.map((product, i) => (
          <Product key={i} {...{ product, afterAddToCart }} />
        ))}
      </div>
    </section>
  );
}

function Product({ product, afterAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    await axios.post(process.env.SERVER_URL + "/api/cart/add", {
      quantity,
      id: product._id,
    });
    return afterAddToCart();
  };

  return (
    <div className="box">
      <span className="discount">
        {Math.floor((product.original_price / product.price) * 100)}%
      </span>

      <div className="icons">
        <a className="fas fa-heart" onClick={addToCart} />
        <a
          target="_blank"
          href={`https://www.facebook.com/sharer/sharer.php?u=https://dlcapp.herokuapp.com/products/${product._id}`}
          className="fb-xfbml-parse-ignore fas fa-share"
          rel="noreferrer"
        />
        <Link href={`/products/${product._id}`}>
          <a href="#" className="fas fa-eye" />
        </Link>
      </div>

      <img
        src={
          product.image ||
          `https://ui-avatars.com/api/?name=${product.title}&size=600`
        }
        alt={product.title}
      />
      <Link href={`/products/${product._id}`}>
        <h3 style={{ marginTop: 5, cursor: "pointer" }}>{product.title}</h3>
      </Link>

      {/* <ReviewStars /> */}
      <div className="price">
        ${product.price} <span>${product.original_price}</span>
      </div>

      <div className="quantity">
        <span>quantity : </span>
        <input
          type="number"
          min={1}
          max={1000}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ textAlign: "center" }}
        />
      </div>

      <a className={styles.btn} onClick={addToCart}>
        <i className="fa fa-shopping-cart" /> Add to cart
      </a>
    </div>
  );
}
