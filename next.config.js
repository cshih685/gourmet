/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb',
        }
    },
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cshih685-nextjs-gourmet.s3.us-east-2.amazonaws.com',
            port: '',
            pathname: '/**',
          },
        ],
    },
    // webpack: (config, { dev }) => {
    //   if (dev) {
    //     config.devtool = "cheap-module-source-map"; // avoids eval
    //   }
    //   return config;
    // },
}

module.exports = nextConfig
