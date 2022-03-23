import axios from "@utils/axios";
import React from "react";
import Layout from "@components/Layout";
import Home from "@components/Home";
import ProductList from "@components/Product/ProductList";
import Newsletter from "@components/Newsletter";
import useCart from "@hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products?limit=8`);
  const setting = await axios.get(`api/settings`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}

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
