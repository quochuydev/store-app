/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL,
  },
  images: {
    domains: ["cf.shopee.vn"],
  },
};
