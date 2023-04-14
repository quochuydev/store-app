import axios from "@utils/axios";
import BlogList from "./components/BlogList";
import Layout from "@components/Layout";
import useCart from "@hooks/useCart";

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/blogs`);

  return {
    props: {
      meta: result?.data?.meta || {},
      blogs: result?.data?.items || [],
    },
  };
}

export default function Products({ blogs }) {
  const [cart] = useCart();

  return (
    <Layout cart={cart}>
      <BlogList blogs={blogs} />
    </Layout>
  );
}
