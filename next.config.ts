import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "/**",
      },
    ],
  },
  env: {
    ENDPOINT_URL: "https://prod.api.richy.prediqt.ai",
    // ENDPOINT_URL: "https://dev.api.harrods.rezolve.prediqt.ai",
    // ENDPOINT_URL: "http://127.0.0.1:8000",
  },
};

export default nextConfig;
