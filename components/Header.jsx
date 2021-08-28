import React, { useState, useEffect } from 'react';
import axios from "axios";

import Menu from "./Menu";
import SearchBox from "./SearchBox";

export default function Header(){
  const [cart, setCart] = useState({})
  const [image, setImage] = useState(null)

  const fetchCart = () => {
    axios.get(process.env.SERVER_URL + "/cart")
      .then(result => setCart(result?.data));
  }

  useEffect(() => {
    fetchCart();
  }, [])

    return <header>
    <div className="header-1">
      <a href="#" className="logo"><i className="fas fa-shopping-basket" />groco</a>
      <SearchBox />
    </div>
    <div className="header-2">
      <div id="menu-bar" className="fas fa-bars" />
      <Menu />
      <div className="icons">
        <a href="#" className="fas fa-shopping-cart">
          <span>{cart.item_count}</span>
        </a>
        {/* <a href="#" className="fas fa-heart" />
        <a href="#" className="fas fa-user-circle" /> */}
      </div>
    </div>
  </header>
}