import React from "react";
import { ToastContainer } from "react-toastify";
import Header from "../Header";
import Footer from "../Footer";
import "react-toastify/dist/ReactToastify.css";

export default function Layout({ cart, children }) {
  return (
    <div>
      <ToastContainer />
      <Header {...{ cart }} />
      <div className="layout">{children}</div>
      <Footer />
    </div>
  );
}
