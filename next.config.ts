import createNextIntlPlugin from 'next-intl/plugin'

import { paths } from './src/config/paths'
import { defaultLocale } from './src/i18n/locales'

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    dirs: ['app', 'src']
  },
  async redirects() {
    return [
      {
        source: paths.root,
        destination: `/${defaultLocale}`,
        permanent: false
      }
    ]
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: [
          {
            loader: '@svgr/webpack',
            options: {
              svgoConfig: {
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false
                      }
                    }
                  },
                  'removeDimensions'
                ]
              }
            }
          }
        ],
        as: '*.js'
      }
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com'
      }
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: true
          }
        }
      ]
    })
    return config
  }
}

const withNextIntl = createNextIntlPlugin()

export default withNextIntl(nextConfig)
