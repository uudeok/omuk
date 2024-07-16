/** @type {import('next').NextConfig} */
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
    compiler: {
        styledComponents: true,
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

export default nextConfig;
