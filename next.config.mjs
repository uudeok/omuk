import path from 'path';

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-omuk-images.s3.ap-northeast-2.amazonaws.com',
                pathname: '/upload/**',
            },
        ],
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        const originalEntry = config.entry;
        config.entry = async () => {
            const entries = await originalEntry();
            if (entries['main.js'] && !entries['main.js'].includes(path.resolve('./polyfills.js'))) {
                entries['main.js'].unshift(path.resolve('./polyfills.js'));
            }
            return entries;
        };

        return config;
    },
    experimental: {
        forceSwcTransforms: true,
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
