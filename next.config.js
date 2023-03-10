module.exports = {
    compiler: {
        styledComponents: true
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: process.env.NEXT_PUBLIC_WP_HOST,
                port: '',
                pathname: '/wp-content/uploads/**',
            },
        ],
    },
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
}