import "../styles/globals.css";
import "../styles/ticket.css";
import "../styles/bootstrap.min.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
export default MyApp;
