/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import axios from "axios";

import useCart from "../../hooks/useCart";

export default function ProductDetail({ product, afterAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const addToCart = async () => {
    await axios.post(process.env.SERVER_URL + "/api/cart/add", {
      quantity,
      id: product._id,
    });
    return afterAddToCart();
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <div className="pro-img-details">
            <img src={product.image} alt={product.title} />
          </div>
          {/* <div className="pro-img-list">
            <img src={product.image} alt={product.title} width={150} />
          </div> */}
        </div>
        <div className="col-md-6">
          <h4 className="pro-d-title">{product.title}</h4>
          <div>{product.body}</div>
          <div className="product_meta">
            <span className="posted_in">
              <strong>Categories:</strong>{" "}
              {["Jackets", "Men", "Shirts", "T-shirt"].map((e, i) => (
                <a key={i} rel="tag" href="#">
                  {e}
                </a>
              ))}
            </span>
            <br />
            <span className="tagged_as">
              <strong>Tags:</strong>{" "}
              {["mens", "womens"].map((e, i) => (
                <a key={i} rel="tag" href="#">
                  {e}
                </a>
              ))}
            </span>
          </div>
          <div className="m-bot15">
            <strong>Price : </strong>
            <p className="price">
              ${product.price} <span>${product.original_price}</span>
            </p>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="quantiy"
              placeholder={1}
              className="form-control quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={{ width: 100, textAlign: "center" }}
            />
          </div>
          <p>
            <button className="btn btn-round btn-danger" onClick={addToCart}>
              <i className="fa fa-shopping-cart" /> Add to Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
