import axios from "axios";

import styles from "../styles/Home.module.css";
import Home from "../components/Home";

export async function getServerSideProps() {
  const result: any = await axios.get(process.env.SERVER_URL + "/api/products");

  return {
    props: {
      products: result?.data?.items || [],
    },
  };
}

export default function Index({ products }: any) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Home products={products} />
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Powered by Huy Pham
        </a>
      </footer>
    </div>
  );
}
