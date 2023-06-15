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
            {
                protocol: 'http',
                hostname: 'uat-apidb.zoonobet.com',
                port    : '',
                pathname: '/home/**',
            },
            {
                protocol: 'https',
                hostname: 'bd.zoonobet.com',
                port    : '',
                pathname: '/home/**',
            },
        ]
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === 'production',
    },
}

module.exports = nextConfig
