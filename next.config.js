/** @type {import('next').NextConfig} */

module.exports = () => {
	const rewrites = () => {
		return [
			{
				source: "/:path*",
				destination: "http://localhost:3001/:path*",
			},
		];
	};
	return {
		rewrites,
		reactStrictMode: true,
		swcMinify: true,
	};
};
