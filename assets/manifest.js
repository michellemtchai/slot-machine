module.exports = {
    short_name: process.env.APP_NAME,
    name: process.env.APP_NAME,
    icons: [
        {
            src: process.env.APP_PUBLIC_URL + '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
            rel: 'icon',
        },
        {
            src: process.env.APP_PUBLIC_URL + '/logo192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable',
            rel: 'apple-touch-icon',
        },
        {
            src: process.env.APP_PUBLIC_URL + '/logo512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable',
            rel: 'apple-touch-icon',
        },
    ],
    start_url: process.env.APP_START_URL,
    display: 'standalone',
    theme_color: process.env.APP_THEME_COLOR,
    background_color: process.env.APP_BACKGROUND_COLOR,
};
