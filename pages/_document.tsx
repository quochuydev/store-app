/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { NextScript, Head, Main, Html } from "next/document";
import config from "../utils/config";

const GA_TRACKING_ID = process.env.GA_TRACKING_ID;
const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    console.log(GA_TRACKING_ID, isProduction);
    return (
      <Html lang="en">
        <Head>
          <base href="/"></base>
          <link rel="icon" href="images/icons/favicon.png" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          ></link>
          {/* {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )} */}
        </Head>

        <body>
          <Main />
          <script src="./js/jquery.min.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
