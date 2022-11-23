/** @type {import('next').NextConfig} */
const withTM = require('next-transpile-modules')([
  'swagger-ui-react',
  'react-syntax-highlighter',
  'swagger-client'
]);

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [{
      source: "/api/sigil/:path",
      headers: [
        { key: "Access-Control-Allow-Origin", value: "*" },
      ]
    }]
  },
}

module.exports = withTM(nextConfig);