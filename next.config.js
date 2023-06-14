/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '10.88.0.106',
                port    : '5050',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
                port    : '',
                pathname: '/vi/**',
            },
        ]
    }
}

module.exports = nextConfig
