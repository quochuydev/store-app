/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from "react";
import axios from "axios";
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
      <div className="header-1">
        <Icon />
        <SearchBox />
      </div>
      <div className="header-2">
        <div id="menu-bar" className="fas fa-bars" />
        <Menu />
        <div className="icons">
          <Link href="/cart">
            <span className="link">
              <i className="fas fa-shopping-cart" /> {cart.item_count}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
