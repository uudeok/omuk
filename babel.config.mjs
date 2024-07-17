export default {
    presets: [
        [
            'next/babel',
            {
                'preset-env': {
                    targets: {
                        browsers: ['>0.25%, not dead', 'safari >= 12'], // 사파리 12 이상 지원
                    },
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            },
        ],
    ],
};
