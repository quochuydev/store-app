import { useRouter } from "next/router";
import React from "react";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import Products from "../../components/Products";
import Category from "../../components/Category";

import useCart from "../../hooks/useCart";
import config from "../../utils/config";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products?limit=8&q=${query.q}`);
  const setting = await axios.get(`api/settings`);

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
      <section>
        <div className="row">
          <div className="col-md-3">
            <div className="mt-5" />
            <Category {...{ setting }} />
          </div>

          <div className="col-md-9">
            <Products
              {...{
                meta,
                products,
                after: () => {
                  getCart();
                  toast("Added to cart", { position: "bottom-right" });
                },
              }}
            />
          </div>
        </div>
      </section>
    </Layout>
  );
}
