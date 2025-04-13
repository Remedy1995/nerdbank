/** @type {import('next').NextConfig} */
const nextConfig = {
      typescript: {
    ignoreBuildErrors: true,
  },
      eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
       {
        source: "/api/:path*", // ✅ Forward API requests to Express API
        destination: "/api/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
