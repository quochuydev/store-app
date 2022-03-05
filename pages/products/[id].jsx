import axios from "../../utils/axios";
import ProductDetail from "../../components/Product/ProductDetail";
import Layout from "../../components/Layout";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products/${query.id}`);

  return {
    props: {
      product: result?.data || {},
    },
  };
}

export default function Product({ product }) {
  return (
    <Layout>
      <ProductDetail product={product} />
    </Layout>
  );
}
