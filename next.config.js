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
    // async headers() {
    //   return [
    //     {
    //       source: '/(.*)',
    //       headers: [
    //         {
    //           key: 'Content-Security-Policy',
    //           value:
    //             "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com; img-src 'self' https://cshih685-nextjs-gourmet.s3.us-east-2.amazonaws.com; connect-src 'self'; font-src 'self' https://fonts.gstatic.com;",
    //         },
    //       ],
    //     },
    //   ];
    // },
    async headers() {
        return [
          {
            source: '/(.*)',
            headers: [
              {
                key: 'Content-Security-Policy',
                value:
                  "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' https://fonts.googleapis.com ;",
              },
            ],
          },
        ];
      },

    
}

module.exports = nextConfig
