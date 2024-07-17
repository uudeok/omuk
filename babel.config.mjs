export default {
    presets: [
        [
            'next/babel',
            {
                'preset-env': {
                    targets: {
                        browsers: ['>0.25%', 'not dead', 'safari >= 13'],
                    },
                    useBuiltIns: 'usage',
                    corejs: 3,
                },
            },
        ],
    ],
};
