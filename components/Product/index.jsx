import Layout from "../Layout";
import useCart from "../../hooks/useCart";

export default function ProductDetail({ product }) {
  const [cart] = useCart();

  return <Layout {...{ cart }}>{product.title}</Layout>;
}
