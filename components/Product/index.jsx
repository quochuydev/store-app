/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";

import styles from "../style.module.css";

export default function ProductDetail({ product, afterAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    await axios.post(process.env.SERVER_URL + "/api/cart/add", {
      quantity,
      id: product._id,
    });
    setLoading(false);
    return afterAddToCart();
  };

  return (
    <section className="mt-5">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.title}
            style={{ width: "100%" }}
            className="p-4"
          />
        </div>
        <div className="col-md-6">
          <h1>{product.title}</h1>
          <div>{product.body}</div>

          <strong>Categories:</strong>
          {product.categories?.map((e, i) => (
            <a key={i} rel="tag" href="#">
              {e}
            </a>
          ))}

          <br />

          <strong>Tags:</strong>
          {product.tags?.map((e, i) => (
            <a key={i} rel="tag" href="#">
              {e}
            </a>
          ))}

          <br />

          <strong>Price: </strong>
          <p className="price">
            ${product.price} <span>${product.original_price}</span>
          </p>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              placeholder={1}
              className="form-control"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: 100, textAlign: "center" }}
            />
          </div>

          <button className={styles.btn} onClick={addToCart} disabled={loading}>
            <i
              className={`fa ${
                loading ? "fa-spinner fa-spin" : "fa-shopping-cart"
              }`}
            />
            Add to cart
          </button>
          <br />
          <p>{product.description}</p>
        </div>
      </div>
    </section>
  );
}
