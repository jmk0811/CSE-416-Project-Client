/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
};

module.exports = () => {
    const rewrites = () => {
        return [
            {
                source: '/:path*',
                destination: 'http://localhost:5000/:path*',
            },
        ];
    };
    return {
        rewrites,
        reactStrictMode: true,
        swcMinify: true,
    };
}