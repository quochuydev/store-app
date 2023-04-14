import Head from "next/head";
import type { AppProps } from "next/app";
import config from "@utils/config";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import "@styles/index.css";
import "@styles/owl.carousel.min.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({});

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>{config.title}</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} position={"bottom-right"} />
      </QueryClientProvider>
    </>
  );
}
export default MyApp;
