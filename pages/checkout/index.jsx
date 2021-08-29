/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";

import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout";

import BillingAddress from "../../components/Checkout/BillingAddress";
import Items from "../../components/Checkout/Items";
import PromoCodeInput from "../../components/Checkout/PromoCodeInput";
import Payment from "../../components/Checkout/Payment";

export default function Checkout() {
  const [cart] = useCart();

  const [customer, setCustomer] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const onData = (name, value) => {
    setCustomer({ ...customer, [name]: value });
  };

  const createOrder = async () => {
    const data = {
      customer,
      line_items: cart.items,
      amount: cart.total_price,
    };

    const result = await axios.post(
      process.env.SERVER_URL + "/api/orders",
      data
    );

    await axios.delete(`${process.env.SERVER_URL}/api/cart`);

    const order = result?.data;
    Router.push(`/order/${order._id}?thankyou=true`);
  };

  return (
    <Layout {...{ cart }}>
      <div className={styles.container}>
        <main>
          <div className="row g-5">
            <div className="col-md-5 col-lg-4 order-md-last">
              <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">
                  {cart.item_count}
                </span>
              </h4>
              <Items {...{ cart }} />
              {/* <PromoCodeInput /> */}
            </div>
            <div className="col-md-7 col-lg-8">
              <h4 className="mb-3">Billing address</h4>
              <form className="needs-validation was-validated" noValidate>
                <BillingAddress {...{ onData }} />
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="same-address"
                    checked
                    disabled
                  />
                  <label className="form-check-label" htmlFor="same-address">
                    Shipping address is the same as my billing address
                  </label>
                </div>
                {/* <Payment /> */}
                <hr className="my-4" />
                <button
                  className="w-100 btn btn-primary btn-lg"
                  onClick={(e) => {
                    e.preventDefault();
                    createOrder();
                  }}
                >
                  Done
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
