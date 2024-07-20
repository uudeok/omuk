import TerserPlugin from 'terser-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import withBundleAnalyzer from '@next/bundle-analyzer';

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
        minimumCacheTTL: 60 * 60 * 24, // 1일
        formats: ['image/avif', 'image/webp'], // AVIF와 WebP 포맷 지원
    },

    swcMinify: true,

    webpack: (config) => {
        // SVG 로더 추가
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        // 코드 스플리팅 및 지연 로딩 최적화
        config.optimization.splitChunks = {
            chunks: 'all',
            cacheGroups: {
                default: false,
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: -10,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        };

        // 트리 쉐이킹 활성화
        config.optimization.usedExports = true;

        // 자바스크립트 최적화
        config.optimization = {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    terserOptions: {
                        compress: {
                            drop_console: true, // 콘솔 로그 제거
                        },
                    },
                }),
            ],
        };

        return config;
    },
};

// BundleAnalyzerPlugin 활성화 (옵션)
export default withBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: true,
})(nextConfig);
