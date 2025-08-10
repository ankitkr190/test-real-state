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
    ENDPOINT_URL: "https://prod.apk.api.prediqt.ai", 
    // ENDPOINT_URL: "https://dev.api.harrods.rezolve.prediqt.ai",
    // ENDPOINT_URL: "http://127.0.0.1:8000",
    NEXT_PUBLIC_LIVEKIT_URL: "wss://apk-ew2toxp5.livekit.cloud",
    NEXT_PUBLIC_LIVEKIT_API_KEY: "APIBntaJVuLz4Dc",
    NEXT_PUBLIC_LIVEKIT_API_SECRET: "FiFeh4P7Qq5GNegopTiGnGe4eHwEk6QcVY1eDMdgrguE",
  },
};

export default nextConfig;
