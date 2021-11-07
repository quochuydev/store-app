import React from "react";

import Header from "../Header";
import Footer from "../Footer";

export default function Layout({ cart, children }) {
  const styles = {
    container: {
      margin: "200px auto 0",
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
