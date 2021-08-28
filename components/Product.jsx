import React, { useState } from 'react'  
import axios from "axios";

const Product = ({ product }) => {
    const [quantity, setQuantity] = useState(1)

    return <div className="box">
            <span className="discount">{product.original_price / product.price}</span>
            <div className="icons">
                <a href="#" className="fas fa-heart" />
                <a href="#" className="fas fa-share" />
                <a href="#" className="fas fa-eye" />
            </div>
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <div className="stars">
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star" />
                <i className="fas fa-star-half-alt" />
            </div>
            <div className="price"> {product.original_price}<span>{product.price}</span> </div>
            <div className="quantity">
                <span>quantity : </span>
                <input type="number" min={1} max={1000} value={quantity} 
                    onChange={e => setQuantity(e.target.value)}/>
            </div>
            <a className="btn" onClick={()=>{
                axios.post("http://localhost:3000/cart/add", {
                    quantity,
                    id: product._id
                });
            }}>add to cart</a>
        </div>
}

export default Product