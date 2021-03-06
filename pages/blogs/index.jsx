import axios from "@utils/axios";
import ProductFilter from "@components/Product/ProductFilter";
import ProductList from "@components/Product/ProductList";
import Layout from "@components/Layout";
import useCart from "@hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
    },
  };
}

export default function Products({ products }) {
  const [cart] = useCart();

  return (
    <Layout cart={cart}>
      <ProductFilter>
        <ProductList products={products} />
      </ProductFilter>
    </Layout>
  );
}
