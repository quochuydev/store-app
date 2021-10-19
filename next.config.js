/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    NODE_ENV: process.env.NODE_ENV,
    SERVER_URL: process.env.SERVER_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
  images: {
    domains: ["cf.shopee.vn"],
  },
};
