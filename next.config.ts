import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'back.mampato.cl',
        port: '',
        pathname: '/ImagenesTickets/**',
      },
    ],
  },
};

export default nextConfig;
