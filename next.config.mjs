/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'media.licdn.com', 'res.cloudinary.com'],
    },
    async headers() {
        return [
            {
                source: '/api/capsule/getCapsule',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'no-store, max-age=0',
                    },
                ],
            },
        ];
    },
};

export default nextConfig;