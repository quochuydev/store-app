import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Deal from "../components/Deal";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import useCart from "../hooks/useCart";

export async function getServerSideProps() {
  const result = await axios.get(
    process.env.SERVER_URL + "/api/products?limit=12"
  );

  const setting = await axios.get(process.env.SERVER_URL + "/api/setting");

  return {
    props: {
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}

export default function Index({ products }: any) {
  const [cart, fetchCart] = useCart();
  const [setting, setSetting] = useState({});

  useEffect(() => {
    axios.get(process.env.SERVER_URL + "/api/setting").then((result) => {
      setSetting(result?.data || {});
    });
  }, []);

  const afterAddToCart = () => {
    fetchCart();
    toast("Added", { position: "bottom-right" });
  };

  return (
    <Layout {...{ cart }}>
      <ToastContainer />
      <Home {...{ setting }} />
      <Banner {...{ setting }} />
      <Category {...{ setting }} />
      <Products {...{ products, afterAddToCart }} />
      {/* <Deal /> */}
      <Contact />
      <Newsletter />
    </Layout>
  );
}
