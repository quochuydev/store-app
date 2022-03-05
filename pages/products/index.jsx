import axios from "../../utils/axios";
import ProductFilter from "../../components/Product/ProductFilter";
import ProductList from "../../components/Product/ProductList";
import Layout from "../../components/Layout";
import useCart from "../../hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products?limit=8`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
    },
  };
}

export default function Products({ products }) {
  const [cart, getCart] = useCart();

  return (
    <Layout cart={cart}>
      <ProductFilter>
        <ProductList products={products} />
      </ProductFilter>
    </Layout>
  );
}
