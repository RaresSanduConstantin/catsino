/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'via.placeholder.com',
          },
          {
            protocol: 'https',
            hostname: 'randomuser.me',
          },
          {
            protocol: 'https',
            hostname: 'cdn2.thecatapi.com',
          },
        ],
      },
};

export default nextConfig;
