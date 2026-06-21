import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Build paytida ESLint xatolarini tekshirmaydi
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Build paytida TypeScript xatolarini tekshirmaydi
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
