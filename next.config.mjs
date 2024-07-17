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
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
    transpilePackages: [
        '@aws-sdk/client-s3',
        '@aws-sdk/lib-storage',
        '@cloudinary/url-gen',
        '@supabase/ssr',
        '@supabase/supabase-js',
        '@tanstack/react-query',
        '@tanstack/react-query-devtools',
        '@tanstack/react-query-next-experimental',
        '@types/react-slick',
        'aws-sdk',
        'cloudinary',
        'dayjs',
        'dotenv',
        'git-filter-repo',
        'lodash',
        'react-kakao-maps-sdk',
        'react-slick',
        'regenerator-runtime',
        'slick-carousel',
        'zustand',
    ],
};

export default nextConfig;
