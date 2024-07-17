export default {
    presets: [
        [
            'next/babel',
            {
                'preset-env': {
                    targets: '> 0.5%, last 3 major versions, safari >= 14, not dead',
                    useBuiltIns: 'entry',
                    corejs: 3,
                },
            },
        ],
    ],
};
