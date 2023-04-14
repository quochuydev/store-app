import { useState, useEffect } from "react";
import axios from "@utils/axios";
import { useQuery } from "react-query";

export default function useCart(): any {
  const { data: cart = {}, refetch: getCart } = useQuery(["cart"], async () => {
    const result = await axios.get("/api/cart");
    return result?.data;
  });

  return [cart, getCart];
}
