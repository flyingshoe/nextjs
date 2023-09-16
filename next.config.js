/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
});

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.mycareersfuture.gov.sg",
        pathname: "/images/company/logos/**",
      },
    ],
  },
  // experimental: {
  //   serverActions: true,
  // },
  async rewrites() {
    return [
      {
        source: "/api/findJob/:path*",
        destination: "https://api.mycareersfuture.gov.sg/:path*",
      },
    ];
  },
};

module.exports = withPWA(nextConfig);
