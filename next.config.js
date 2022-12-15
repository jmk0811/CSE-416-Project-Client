/** @type {import('next').NextConfig} */

module.exports = () => {
	const rewrites = () => {
		return [
			{
				source: "/:path*",
				destination: "https://cse-416-project-server.herokuapp.com/:path*",
			},
		];
	};
	return {
		rewrites,
		reactStrictMode: false,
		swcMinify: true,
		eslint: {
			ignoreDuringBuilds: true,
		},
	};
};
