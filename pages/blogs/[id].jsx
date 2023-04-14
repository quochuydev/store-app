import { toast } from "react-toastify";
import axios from "@utils/axios";
import ProductDetail from "@components/Product/ProductDetail";
import Layout from "@components/Layout";
import useCart from "@hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/blogs/${query.id}`);

  return {
    props: {
      blog: result?.data || {},
    },
  };
}

export default function Product({ blog }) {
  const [cart] = useCart();

  return <Layout cart={cart}>{JSON.stringify(blog)}</Layout>;
}
