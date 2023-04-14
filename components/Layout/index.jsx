import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "@components/Header";
import Footer from "@components/Footer";
import "react-toastify/dist/ReactToastify.css";
import useCart from "@hooks/useCart";

export default function Layout({ children }) {
  const [cart] = useCart();

  return (
    <div>
      <ToastContainer />
      <Header {...{ cart }} />
      <div className="layout">{children}</div>
      <Footer />
    </div>
  );
}
