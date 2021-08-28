import axios from "axios";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Deal from "../components/Deal";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";

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
  return (
    <Layout>
      <Home />
      <Banner />
      <Category />
      <Products products={products} />
      <Deal />
      <Contact />
      <Newsletter />
    </Layout>
  );
}
