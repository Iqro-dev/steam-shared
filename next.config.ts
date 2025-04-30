import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
      protocol: "https",
      hostname: 'avatars.steamstatic.com',
      },
      {
      protocol: "http",
      hostname: 'media.steampowered.com',
      }
    ],
  },
};

export default nextConfig;
