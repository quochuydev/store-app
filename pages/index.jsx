import axios from "@utils/axios";
import Index from "@components/Index";
export default Index;

export async function getServerSideProps({ query }) {
  const result = await axios.get(`api/products?limit=8`);
  const setting = await axios.get(`api/settings`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}
