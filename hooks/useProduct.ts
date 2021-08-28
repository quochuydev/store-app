import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useProduct(props: any) {
  const [products, setProducts] = useState([]);

  const fetchCart = () => {
    axios.get(process.env.SERVER_URL + "/api/products").then((result) => {
      const newProducts = result?.data?.items || [];
      console.log(newProducts);
      setProducts(newProducts);
    });
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return [products];
}
