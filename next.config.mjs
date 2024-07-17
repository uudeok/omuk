/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        forceSwcTransforms: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-omuk-images.s3.ap-northeast-2.amazonaws.com',
                pathname: '/upload/**',
            },
        ],
    },
    webpack: (config, { isServer }) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        if (!isServer) {
            const originalEntry = config.entry;
            config.entry = async () => {
                const entries = await originalEntry();
                if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) {
                    entries['main.js'].unshift('./polyfills.js');
                }
                return entries;
            };
        }

        return config;
    },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         remotePatterns: [
//             {
//                 protocol: 'https',
//                 hostname: 's3-omuk-images.s3.ap-northeast-2.amazonaws.com',
//                 pathname: '/upload/**',
//             },
//         ],
//     },
//     webpack: (config) => {
//         config.module.rules.push({
//             test: /\.svg$/,
//             use: ['@svgr/webpack'],
//         });

//         return config;
//     },
// };

// export default nextConfig;
