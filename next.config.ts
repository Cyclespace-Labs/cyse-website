import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    qualities: [25, 50, 75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*.mp4',
        headers: [{ key: 'Content-Type', value: 'video/mp4' }],
      },
      {
        source: '/:path*.webm',
        headers: [{ key: 'Content-Type', value: 'video/webm' }],
      },
    ];
  },
};

export default nextConfig;
