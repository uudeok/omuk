import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,

    // 서버가 클라이언트로 반환하는 응답에 대해 캐시 헤더를 강제로 설정
    // headers: async () => {
    //     return [
    //         {
    //             headers: [
    //                 {
    //                     key: 'Cache-Control',
    //                     value: 'public, max-age=86400, immutable',
    //                 },
    //             ],

    //             source: '/:path(.+\\.(?:ico|png|svg|jpg|jpeg|gif|webp|json|mp3|mp4|ttf|ttc|otf|woff|woff2)$)',
    //         },
    //     ];
    // },

    // Next/Image 컴포넌트와 관련된 이미지 처리 및 최적화 설정
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
