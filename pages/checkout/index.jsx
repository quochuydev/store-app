/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from "react";
import Router from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";

import axios from "@utils/axios";
import useCart from "@hooks/useCart";
import Layout from "@components/Layout";
import useTranslation from "@locales/useTranslation";

export default function Checkout() {
  const { t } = useTranslation();
  const [cart] = useCart();
  const [paymentType, setPaymentType] = useState("cod");

  const schema = useMemo(
    () =>
      yup.object().shape({
        title: yup.string().trim().required(),
        price: yup.number().min(0).notRequired(),
        originalPrice: yup.number().min(0).notRequired(),
        description: yup.string().trim().nullable().notRequired(),
        image: yup.string().trim().required(),
      }),
    []
  );

  const formik = useFormik({
    initialValues: {
      title: null,
      price: 0,
      originalPrice: 0,
      description: null,
      image: null,
    },
    validationSchema: schema,
    onSubmit: async (data) => {
      console.log(data);
      try {
        await axios.post(`api/products`, data);
        toast("Created success");
        formik.resetForm();
        Router.push(`/admin/products`);
      } catch (error) {
        toast.error("Created success");
      }
    },
  });

  const [customer, setCustomer] = useState({
    firstName: "",
    phoneNumber: "",
    email: "",
    address: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
  };

  const createOrder = async () => {
    if (!customer.firstName || customer.firstName === "") {
      return toast.error("Invalid first name!");
    }
    if (!customer.phoneNumber || customer.phoneNumber === "") {
      return toast.error("Invalid phone number!");
    }
    if (!customer.address || customer.address === "") {
      return toast.error("Invalid address!");
    }

    const result = await axios.post(`/api/orders`, {
      customer,
      lineItems: cart.items,
      amount: cart.total_price,
      payment: {
        type: paymentType,
      },
    });

    await axios.delete(`/api/cart`);

    const order = result?.data;
    Router.push(`/order/${order._id}?thankyou=true`);
  };

  return (
    <Layout {...{ cart }}>
      <div>
        <div className="mt-8">
          <h1 className="flex items-center justify-center font-bold text-indigo-600 text-md lg:text-3xl">
            Checkout
          </h1>
        </div>
        <div className="container mx-auto">
          <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
            <div className="flex flex-col md:w-full">
              <h2 className="mb-4 font-bold md:text-xl text-heading ">
                Shipping Address
              </h2>
              <form
                className="justify-center w-full mx-auto"
                method="post"
                action
              >
                <div className>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2">
                      <label
                        htmlFor="firstName"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        First Name
                      </label>
                      <input
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        {...{ onChange }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 ">
                      <label
                        htmlFor="firstName"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        Last Name
                      </label>
                      <input
                        name="Last Name"
                        type="text"
                        placeholder="Last Name"
                        {...{ onChange }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label
                        htmlFor="Email"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        Email
                      </label>
                      <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        {...{ onChange }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full">
                      <label
                        htmlFor="Address"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        Address
                      </label>
                      <textarea
                        className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                        name="address"
                        cols={20}
                        rows={4}
                        placeholder="Address"
                        defaultValue={""}
                        {...{ onChange }}
                      />
                    </div>
                  </div>
                  <div className="space-x-0 lg:flex lg:space-x-4">
                    <div className="w-full lg:w-1/2 ">
                      <label
                        htmlFor="District"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        District
                      </label>
                      <input
                        name="district"
                        type="text"
                        placeholder="District"
                        {...{ onChange }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                    <div className="w-full lg:w-1/2">
                      <label
                        htmlFor="city"
                        className="block mb-3 text-sm font-semibold text-gray-500"
                      >
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        placeholder="City"
                        {...{ onChange }}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>
                  <div className="flex items-center mt-4">
                    <label className="flex items-center text-sm group text-heading">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                      />
                      <span className="ml-2">
                        Save this information for next time
                      </span>
                    </label>
                  </div>
                  <div className="relative pt-3 xl:pt-6">
                    <label
                      htmlFor="note"
                      className="block mb-3 text-sm font-semibold text-gray-500"
                    >
                      {" "}
                      Notes (Optional)
                    </label>
                    <textarea
                      name="note"
                      className="flex items-center w-full px-4 py-3 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-600"
                      rows={4}
                      placeholder="Notes for delivery"
                      defaultValue={""}
                    />
                  </div>

                  <div className="mt-4">
                    <button
                      className="w-full px-6 py-2 text-indigo-200 bg-indigo-600 hover:bg-blue-900"
                      onClick={(e) => {
                        e.preventDefault();
                        createOrder();
                      }}
                    >
                      {t("label.done")}
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
              <div className="pt-12 md:pt-0 2xl:ps-4">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <div className="mt-8">
                  <div className="flex flex-col space-y-4">
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src="https://source.unsplash.com/user/erondu/500x500"
                          alt="image"
                          className="w-60"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Title</h2>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, tet
                        </p>
                        <span className="text-red-600">Price</span> $20
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="flex space-x-4">
                      <div>
                        <img
                          src="https://source.unsplash.com/collection/190727/500x500"
                          alt="image"
                          className="w-60"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold">Title</h2>
                        <p className="text-sm">
                          Lorem ipsum dolor sit amet, tet
                        </p>
                        <span className="text-red-600">Price</span> $20
                      </div>
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex p-4 mt-4">
                  <h2 className="text-xl font-bold">ITEMS 2</h2>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Subtotal<span className="ml-2">$40.00</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Shipping Tax<span className="ml-2">$10</span>
                </div>
                <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
                  Total<span className="ml-2">$50.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
