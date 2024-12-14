// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   // source: '/api/:path*',
//   // destination: 'https://webpro-final-backend-production.up.railway.app/:path*',
// };

// export default nextConfig;


// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*', // Local API route
        destination: 'https://webpro-final-backend-production.up.railway.app/:path*', // External API endpoint
      },
    ];
  },
};
