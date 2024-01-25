module.exports = {
  images: {
    domains: ['a.storyblok.com'],
    minimumCacheTTL: parseInt(process.env.imageMinimumCacheTTL),
    formats: ['image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'a.storyblok.com',
        port: '',
        pathname: '',
      },
    ],
  },
}