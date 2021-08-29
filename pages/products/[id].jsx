import axios from "axios";

import ProductDetail from "../../components/Product";

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
  return <ProductDetail {...{ product }} />;
}
