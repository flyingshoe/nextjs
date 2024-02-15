/** @type {import('next').NextConfig} */
const { NextFederationPlugin } = require("@module-federation/nextjs-mf");

const withPWA = require("@ducanh2912/next-pwa").default({
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
  webpack: (config, options) => {
    //config.experiments = { topLevelAwait: true, layers: false };
    config.plugins.push(
      new NextFederationPlugin({
        name: "flyingshoe",
        filename: "static/chunks/remoteEntry.js",
        // exposes: {
        //   "./home": "./src/app/page.tsx",
        // },
        extraOptions: {
          exposePages: true,
        },
      })
    );
    return config;
  },
};

module.exports = withPWA(nextConfig);
