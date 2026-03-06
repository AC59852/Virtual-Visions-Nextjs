import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [new URL('https://pub-af3ce01747104d4e8eed8e77cd14da3a.r2.dev/**')]
  }
};

export default nextConfig;
