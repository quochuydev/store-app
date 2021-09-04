/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import axios from "axios";
import Router from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.module.css";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout";

import BillingAddress from "../../components/Checkout/BillingAddress";
import Items from "../../components/Checkout/Items";
import PromoCodeInput from "../../components/Checkout/PromoCodeInput";
import Payment from "../../components/Checkout/Payment";

export default function Checkout() {
  const [cart] = useCart();

  const [paymentType, setPaymentType] = useState("cod");

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
    if (!customer.firstName || customer.firstName === "") {
      return toast("Invalid first name!");
    }
    if (!customer.phoneNumber || customer.phoneNumber === "") {
      return toast("Invalid phone number!");
    }
    if (!customer.address || customer.address === "") {
      return toast("Invalid address!");
    }

    const result = await axios.post(`${process.env.SERVER_URL}/api/orders`, {
      customer,
      line_items: cart.items,
      amount: cart.total_price,
      payment: {
        type: paymentType,
      },
    });

    await axios.delete(`${process.env.SERVER_URL}/api/cart`);

    const order = result?.data;
    Router.push(`/order/${order._id}?thankyou=true`);
  };

  return (
    <Layout {...{ cart }}>
      <ToastContainer />

      <section className={styles.container}>
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

              <h4 className="d-flex justify-content-between align-items-center mt-5">
                <span className="text-primary">Payment method</span>
              </h4>
              <div className="mt-3">
                <div className="form-check">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                    checked={paymentType === "cod"}
                    onChange={() => setPaymentType("cod")}
                  />
                  <label className="form-check-label" htmlFor="credit">
                    Cash On Delivery (COD)
                  </label>
                </div>
                <div className="form-check">
                  <input
                    id="debit"
                    name="paymentMethod"
                    type="radio"
                    className="form-check-input"
                    required
                    checked={paymentType === "bank"}
                    onChange={() => setPaymentType("bank")}
                  />
                  <label className="form-check-label" htmlFor="debit">
                    Bank tranfer
                  </label>
                </div>
              </div>
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
      </section>
    </Layout>
  );
}
