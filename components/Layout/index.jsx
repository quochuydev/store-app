import React from "react";

import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ cart, children }) {
  return (
    <div>
      <Header {...{ cart }} />
      {children}
      <Footer />
    </div>
  );
}
