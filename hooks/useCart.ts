import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useCart() {
  const [cart, setCart] = useState({
    items: [],
  });

  const fetchCart = () => {
    console.log("fetch cart");

    axios.get(process.env.SERVER_URL + "/api/cart").then((result) => {
      console.log(result?.data);
      setCart(result?.data);
    });
  };

  useEffect(fetchCart, []);

  return [cart, fetchCart];
}
