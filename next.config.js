/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['checkout.razorpay.com', 'd2coadv2i0didl.cloudfront.net'],
  },
};

module.exports = nextConfig;
