import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts')

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  // Serve the standalone CMC Projects Tracker (static files in public/tracker)
  // at the clean URL /tracker without requiring index.html in the path.
  async rewrites() {
    return [
      { source: '/tracker', destination: '/tracker/index.html' },
      { source: '/tracker/', destination: '/tracker/index.html' },
    ]
  },
}

export default withNextIntl(nextConfig)
