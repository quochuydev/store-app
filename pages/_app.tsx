import Head from "next/head";
import type { AppProps } from "next/app";
import config from "@utils/config";
import "@styles/index.css";
import "@styles/owl.carousel.min.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
export default MyApp;
