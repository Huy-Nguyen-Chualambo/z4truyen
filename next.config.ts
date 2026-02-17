import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.otruyenapi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sv1.otruyencdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "sv2.otruyencdn.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
