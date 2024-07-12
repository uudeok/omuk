/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['s3-omuk-images.s3.ap-northeast-2.amazonaws.com'],
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
