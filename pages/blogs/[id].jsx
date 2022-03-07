import { toast } from "react-toastify";
import axios from "@utils/axios";
import ProductDetail from "@components/Product/ProductDetail";
import Layout from "@components/Layout";
import useCart from "@hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products/${query.id}`);

  return {
    props: {
      product: result?.data || {},
    },
  };
}

export default function Product({ product }) {
  const [cart, getCart] = useCart();

  return (
    <Layout cart={cart}>
      <ProductDetail
        product={product}
        after={() => {
          getCart();
          toast("Added to cart", { position: "bottom-right" });
        }}
      />
    </Layout>
  );
}
