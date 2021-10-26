import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Newsletter from "../components/Newsletter";

import useCart from "../hooks/useCart";
import useTranslation from "../locales/useTranslation";

export default function Index({ meta, products, setting }) {
  const { t } = useTranslation();

  const [cart, getCart] = useCart();

  const afterAddToCart = () => {
    getCart();
    toast("Added to cart", { position: "bottom-right" });
  };

  return (
    <Layout {...{ cart }}>
      <ToastContainer />
      <Home {...{ setting }} />
      <h1 className="heading">
        {t("label.shopBy")} <span>{t("label.category")}</span>
      </h1>
      <Category {...{ setting }} />
      <Products {...{ meta, products, afterAddToCart }} />
      {/* <Banner {...{ setting }} /> */}
      <Newsletter />
    </Layout>
  );
}
