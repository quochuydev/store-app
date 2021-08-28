import axios from "axios";

import Layout from "../components/Layout";

export async function getServerSideProps() {
  const result: any = await axios.get(
    process.env.SERVER_URL + "/api/products?limit=12"
  );

  return {
    props: {
      products: result?.data?.items || [],
    },
  };
}

export default function Index({ products }: any) {
  return <Layout products={products} />;
}
