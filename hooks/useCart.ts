import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useCart(): any {
  const [cart, setCart] = useState({
    items: [],
  });

  const getCart = () => {
    console.log("fetch cart");

    axios.get(process.env.SERVER_URL + "/api/cart").then((result) => {
      setCart(result?.data);
    });
  };

  useEffect(getCart, []);

  return [cart, getCart];
}
