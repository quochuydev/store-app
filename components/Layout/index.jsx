import React from "react";

import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ cart, children }) {
  const styles = {
    container: {
      maxWidth: "150rem",
      fontSize: "1.8rem",
      margin: "0rem auto",
    },
  };

  return (
    <div>
      <Header {...{ cart }} />
      <div style={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}
