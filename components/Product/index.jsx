/* eslint-disable @next/next/no-img-element */
import useCart from "../../hooks/useCart";

export default function ProductDetail({ product }) {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <div className="pro-img-details">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="pro-img-list">
            <img src={product.image} alt={product.title} width={150} />
          </div>
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
            <span className="amount-old">${product.original_price}</span>
            <span className="pro-price"> ${product.price}</span>
          </div>
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="quantiy"
              placeholder={1}
              className="form-control quantity"
            />
          </div>
          <p>
            <button className="btn btn-round btn-danger" type="button">
              <i className="fa fa-shopping-cart" /> Add to Cart
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
