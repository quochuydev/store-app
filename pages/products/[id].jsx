import axios from "axios";

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
  const [cart, fetchCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <ProductDetail {...{ product, afterAddToCart: () => fetchCart() }} />
    </Layout>
  );
}
