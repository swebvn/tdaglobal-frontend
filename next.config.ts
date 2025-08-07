import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const cmsUrl = process.env.NEXT_PUBLIC_STRAPI_URL;

// Type-safe image patterns configuration
interface ImagePattern {
  protocol: 'http' | 'https';
  hostname: string;
  port?: string;
  pathname: string;
}

const imagePatterns: ImagePattern[] = [];

// Configure image patterns based on CMS URL
if (cmsUrl) {
  try {
    const url = new URL(cmsUrl);
    imagePatterns.push({
      protocol: url.protocol.replace(':', '') as 'http' | 'https',
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: '/uploads/**',
    });
  } catch {
    console.warn('Invalid CMS_URL provided:', cmsUrl);
    // Fallback to localhost for development
    imagePatterns.push({
      protocol: 'http',
      hostname: 'localhost',
      port: '1337',
      pathname: '/uploads/**',
    });
  }
} else {
  // Development fallback - allow common development domains
  imagePatterns.push(
    { protocol: 'http', hostname: 'localhost', pathname: '/uploads/**' },
    { protocol: 'https', hostname: 'localhost', pathname: '/uploads/**' },
    { protocol: 'http', hostname: '127.0.0.1', pathname: '/uploads/**' },
    { protocol: 'https', hostname: '127.0.0.1', pathname: '/uploads/**' }
  );
}

const nextConfig: NextConfig = {
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Image configuration
  images: {
    remotePatterns: imagePatterns,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
