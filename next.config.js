/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["images2.imgbox.com", "zenit.org"],
  },
  compiler: {
    styledComponents: true,
  },
};
