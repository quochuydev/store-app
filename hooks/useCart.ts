import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function useCart(): any {
  const [cart, setCart] = useState({
    items: [],
  });

  const getCart = () => {
    axios.get("/api/cart").then((result) => {
      setCart(result?.data);
    });
  };

  useEffect(getCart, []);

  return [cart, getCart];
}
