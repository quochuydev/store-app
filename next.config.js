const removeImports = require("next-remove-imports")();

/** @type {import('next').NextConfig} */
module.exports = removeImports({
  // reactStrictMode: true,
  env: {
    SERVER_URL: process.env.SERVER_URL || "http://localhost:1111",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
  },
  images: {
    domains: [],
  },
  // useFileSystemPublicRoutes: false,
});
