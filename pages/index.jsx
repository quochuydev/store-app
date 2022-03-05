import axios from "../utils/axios";
import config from "../utils/config";
import { noSSRWithLoadingDynamic } from "../utils/dynamic.import";
// export default noSSRWithLoadingDynamic(import("../components/Index"));
import Index from '../components/Index'
export default Index

export async function getServerSideProps({ query }) {
  const result = await axios.get(`${config.server}/api/products?limit=8`);
  const setting = await axios.get(`${config.server}/api/settings`);

  return {
    props: {
      meta: result?.data?.meta || {},
      products: result?.data?.items || [],
      setting: setting?.data || {},
    },
  };
}
