import Head from "next/head";

import "../styles/globals.css";
import "../styles/ticket.css";
import "../styles/bootstrap.min.css";
import type { AppProps } from "next/app";
import config from "../utils/config";

function MyApp({ Component, pageProps }: AppProps) {
  <>
    <Head>
      <title>{config.title}</title>
    </Head>
    <Component {...pageProps} />
  </>;
}
export default MyApp;
