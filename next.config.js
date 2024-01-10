/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import('./src/env.js');

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn2.iconfinder.com',
        pathname: '/data/icons/minimal-set-five/32/minimal-48-512.png',
      },
      {
        protocol: 'https',
        hostname: 'u1x1jzfdkfj7i6fi.public.blob.vercel-storage.com',
        pathname: '/*',
      },
      {
        protocol: 'https',
        hostname: 'byntfusd4ovvdowf.public.blob.vercel-storage.com',
        pathname: '/*',
      },
    ],
  },
};

export default config;
