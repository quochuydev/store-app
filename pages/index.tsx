import axios from "axios";

import Layout from "../components/Layout";
import Home from "../components/Home";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Products from "../components/Products";
import Deal from "../components/Deal";
import Contact from "../components/Contact";
import Newsletter from "../components/Newsletter";
import useCart from "../hooks/useCart";

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
  const [cart, fetchCart] = useCart();

  return (
    <Layout {...{ cart }}>
      <Home />
      <Banner />
      <Category />
      <Products {...{ products, afterAddToCart: () => fetchCart() }} />
      {/* <Deal /> */}
      <Contact />
      <Newsletter />
    </Layout>
  );
}
