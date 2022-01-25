import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../components/Layout";
import Products from "../../components/Products";
import Category from "../../components/Category";

import useCart from "../../hooks/useCart";
import config from "../../utils/config";

export async function getServerSideProps({ query }) {
  const result = await axios.get(
    `${config.server}/api/products?limit=8&q=${query.q}`
  );
  const setting = await axios.get(`${config.server}/api/settings`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}

export default function Search({ meta, products, setting }) {
  const { q } = useRouter().query;
  const [cart, getCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <ToastContainer />
      <section>
        <div className="row">
          <div className="col-md-3">
            <div className="mt-5" />
            <Category {...{ setting }} />
          </div>

          <div className="col-md-9">
            <Products {...{ meta, products, after: () => {
              getCart();
              toast("Added to cart", { position: "bottom-right" });
            }}} />
          </div>
        </div>
      </section>
    </Layout>
  );
}
