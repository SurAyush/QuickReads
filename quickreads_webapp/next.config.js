/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true, // Enable Server Actions
  },
  images: { unoptimized: true } ,
  typescript:{
    ignoreBuildErrors: true
  },
  eslint:{
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
