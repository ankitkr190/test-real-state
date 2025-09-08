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
    TEST_ENDPOINT_URL: "https://test.apk.prediqt.it",
    // ENDPOINT_URL: "https://dev.api.harrods.rezolve.prediqt.ai",
    // ENDPOINT_URL: "http://127.0.0.1:8000",
    // NEXT_PUBLIC_LIVEKIT_URL: "wss://richytest-tftsuk11.livekit.cloud",
    // NEXT_PUBLIC_LIVEKIT_API_KEY: "APIPT95GnKVLMhf",
    // NEXT_PUBLIC_LIVEKIT_API_SECRET: "fk9ZwnGH9GA88l7F6nAUjLcsKzunrKSJuJVOlK0d3fI",
  },
};

export default nextConfig;
