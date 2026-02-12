/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убрано output: 'standalone' для Netlify
  // Плагин @netlify/plugin-nextjs сам обрабатывает деплой
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
