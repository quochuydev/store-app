import React, { useState } from "react";
import axios from "axios";

import useCart from "../hooks/useCart";

const Product = ({ product }) => {
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
        className="btn"
        onClick={async () => {
          await axios.post(process.env.SERVER_URL + "/api/cart/add", {
            quantity,
            id: product._id,
          });
        }}
      >
        add to cart
      </a>
    </div>
  );
};

export default Product;
