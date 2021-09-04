import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "../../components/Layout";
import Products from "../../components/Products";

import useCart from "../../hooks/useCart";
import config from "../../utils/config";

export async function getServerSideProps({ query }) {
  console.log(query);
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
  const [cart, fetchCart] = useCart();

  const afterAddToCart = () => {
    fetchCart();
    toast("Added to cart", { position: "bottom-right" });
  };

  return (
    <section>
      <div className="row">
        <div className="col-md-3">
          <div className="widget">
            <div className="widget-title widget-collapse mt-2">
              <h3>{"name"}</h3>
            </div>
            <div className="collapse show" id="dateposted">
              <div className="widget-content">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input me-2"
                    value={"option.value"}
                  />
                  <label className="custom-control-label">
                    {"option.name"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <Products {...{ meta, products, afterAddToCart }} />
        </div>
      </div>
    </section>
  );
}
