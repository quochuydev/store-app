import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ProductDetail from "../../components/Product";
import useCart from "../../hooks/useCart";
import Layout from "../../components/Layout";

export async function getServerSideProps({ query }) {
  const result = await axios.get(
    `${process.env.SERVER_URL}/api/products/${query.id}`
  );

  return {
    props: {
      product: result?.data || {},
    },
  };
}

export default function Product({ product }) {
  const [cart, getCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <ToastContainer />
      <ProductDetail
        {...{
          product,
          after: () => {
            getCart();
            toast("Added to cart", { position: "bottom-right" });
          },
        }}
      />
    </Layout>
  );
}
