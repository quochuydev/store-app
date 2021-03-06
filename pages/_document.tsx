/* eslint-disable @next/next/no-title-in-document-head */
/* eslint-disable @next/next/google-font-display */
/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import Document, { NextScript, Head, Main, Html } from "next/document";

const TrackingId = process.env.GA_TRACKING_ID;
const isProduction = process.env.NODE_ENV === "production";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    TrackingId && console.log(TrackingId, isProduction);

    return (
      <Html lang="en">
        <Head>
          <base href="/"></base>
          <link rel="icon" href="favicon.png" />

          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700,800,900"
          />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          ></link>
          {isProduction && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${TrackingId}`}
              />
              <script
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                  __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${TrackingId}', {
              page_path: window.location.pathname,
            });
          `,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Main />
          <script src="./js/jquery.min.js"></script>
          <script src="./js/owl.carousel.min.js"></script>
          <script src="./js/app.js"></script>
          <NextScript />
        </body>
      </Html>
    );
  }
}
