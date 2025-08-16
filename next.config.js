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
}

module.exports = nextConfig
