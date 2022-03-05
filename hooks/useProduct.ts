import { useState, useEffect } from "react";
import axios from "../utils/axios";

export default function useProduct(props: any) {
  const [products, setProducts] = useState([]);

  const fetchProduct = () => {
    axios.get("/api/products").then((result) => {
      const newProducts = result?.data?.items || [];
      setProducts(newProducts);
    });
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return [products];
}
