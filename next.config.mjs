/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  webpack: (config, { webpack }) => {
    // Fabric.js v5 references jsdom for its Node build; the browser build never
    // calls it, but webpack still tries to resolve it. Ignore it entirely.
    config.plugins.push(
      new webpack.IgnorePlugin({ resourceRegExp: /^jsdom$|jsdom\// }),
    );
    return config;
  },
};

export default nextConfig;
