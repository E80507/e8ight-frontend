/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.printtie.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
