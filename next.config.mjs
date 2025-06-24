/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fuerza la exportación estática
  output: 'export',
  distDir: 'static-app',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
