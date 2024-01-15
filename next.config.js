/** @type {import('next').NextConfig} */
require('dotenv').config();
const nextConfig = {
    images: {
        domains: [
          'cdn.popsww.com',
          'drive.google.com',
          'cdn.tgdd.vn',
        ],
      },
}

module.exports = nextConfig
