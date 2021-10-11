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
import config from "../utils/config";
import useTranslation from "../locales/useTranslation";

import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";

export default noSSRWithLoadingDynamic(import("../components/Index"));

export async function getServerSideProps() {
  const result = await axios.get(`${config.server}/api/products?limit=9`);
  const setting = await axios.get(`${config.server}/api/settings`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}
