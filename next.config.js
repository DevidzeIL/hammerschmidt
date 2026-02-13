/** @type {import('next').NextConfig} */
const nextConfig = {
  // standalone только при сборке в Docker (NEXT_STANDALONE=1)
  ...(process.env.NEXT_STANDALONE === '1' && { output: 'standalone' }),
  images: { unoptimized: true },
}

module.exports = nextConfig
