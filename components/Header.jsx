/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Menu from "./Menu";
import SearchBox from "./SearchBox";

function Icon() {
  return (
    <a href="#" className="logo">
      <i className="fas fa-shopping-basket" />
      groco
    </a>
  );
}

export default function Header({ cart }) {
  return (
    <header>
      <div className="header-top">
        <p className="top-message">Mid-Season Sale Up to 70% OFF. Shop Now</p>
      </div>
      <div className="header-1">
        <Icon />
        <SearchBox />
      </div>
      <div className="header-2">
        <div id="menu-bar" className="fas fa-bars" />
        <Menu />
        {cart && (
          <div className="icons">
            <Link href="/cart">
              <span className="link">
                <i className="fas fa-shopping-cart" /> {cart.item_count}
              </span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
