import React from "react";
import { toast } from "react-toastify";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import ProductList from "../components/Product/ProductList";
import Newsletter from "../components/Newsletter";
import config from "../utils/config";
import useCart from "../hooks/useCart";
import useTranslation from "../locales/useTranslation";

export default function Index({ meta, products, setting }) {
  const { t } = useTranslation();
  console.log(`config`, config);

  const [cart, getCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <Home {...{ setting }} />
      <h1 className="heading">
        {t("label.shopBy")} <span>{t("label.category")}</span>
      </h1>
      <Category {...{ setting }} />
      <Products {...{ meta, products, after: () => {
        getCart();
        toast("Added to cart", { position: "bottom-right" });
      } }} />
      <ProductList {...{ products }}/>
      <Newsletter />
    </Layout>
  );
}
