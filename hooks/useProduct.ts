import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useProduct(props: any) {
  const [products, setProducts] = useState([]);

  const fetchProduct = () => {
    axios.get(process.env.SERVER_URL + "/api/products").then((result) => {
      const newProducts = result?.data?.items || [];
      setProducts(newProducts);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return [products];
}
