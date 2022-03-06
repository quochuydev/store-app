import React from "react";
import Layout from "@components/Layout";
import Home from "@components/Home";
import ProductList from "@components/Product/ProductList";
import Newsletter from "@components/Newsletter";
import useCart from "@hooks/useCart";

export default function Index({ meta, products, setting }) {
  const [cart] = useCart();

  return (
    <Layout {...{ cart }}>
      <Home {...{ setting }} />
      <ProductList {...{ products }} />
      <Newsletter />
    </Layout>
  );
}
