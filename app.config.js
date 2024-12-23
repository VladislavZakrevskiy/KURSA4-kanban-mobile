export default {
    expo: {
        name: 'kanban-app',
        slug: 'kanban-app',
        version: '1.0.0',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        ios: {
            supportsTablet: true,
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
        },
        extra: {
            API_URL: process.env.API_URL || 'ХУЙ',
            IS_DEV: process.env.IS_DEV || 'true',
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },

        plugins: ['expo-router', 'expo-localization'],
        experiments: {
            typedRoutes: true,
        },
    },
}
