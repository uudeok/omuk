import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 's3-omuk-images.s3.ap-northeast-2.amazonaws.com',
                pathname: '/upload/**',
            },
        ],
        minimumCacheTTL: 60 * 60 * 24, // 1일
        formats: ['image/avif', 'image/webp'],
    },

    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        return config;
    },
};

// BundleAnalyzerPlugin 활성화
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true, // 빌드 후 분석 보고서를 브라우저에서 자동으로 열기
})(nextConfig);
