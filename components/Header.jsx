/* eslint-disable @next/next/link-passhref */
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Menu from "./Menu";
import SearchBox from "./SearchBox";
import useTranslation from "../locales/useTranslation";
import SocialLogin from "./SocialLogin";

function Icon() {
  return (
    <a href="#" className="logo">
      <i className="fas fa-shopping-basket" />
      Coffee
    </a>
  );
}

export default function Header({ cart }) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header>
      {/* <div className="header-top">
        <p className="top-message">Mid-Season Sale Up to 70% OFF. Shop Now</p>
      </div> */}
      <div className="header-1">
        <Icon />
        <SearchBox />
      </div>
      <div className="header-2">
        <div id="menu-bar" className="fas fa-bars" />
        <Menu />
        <div style={{ display: "flex" }}>
          {cart && (
            <div className="icons">
              <Link href="/cart">
                <span className="link">
                  <i className="fas fa-shopping-cart" /> {cart.item_count}
                </span>
              </Link>
            </div>
          )}
          <select
            className="language"
            style={{
              marginLeft: 10,
              background: "#000",
              color: "#fff",
              textAlign: "center",
            }}
            value={i18n.language}
            onChange={(e) => changeLanguage(e.target.value)}
          >
            <option value="vn">vn</option>
            <option value="en">en</option>
          </select>
          <SocialLogin />
        </div>
      </div>
    </header>
  );
}
