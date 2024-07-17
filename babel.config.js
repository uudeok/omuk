// babel.config.js
module.exports = {
    presets: [
        'next/babel', // Next.js 기본 설정 사용
        '@babel/preset-env',
        '@babel/preset-react',
    ],
    plugins: [
        ['@babel/plugin-proposal-private-methods', { loose: true }], // loose 옵션 사용
    ],
};
