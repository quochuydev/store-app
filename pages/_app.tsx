import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import "../styles/ticket.css";
import "../styles/bootstrap.min.css";
import "../styles/owl.carousel.min.css";

import config from "../utils/config";

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
