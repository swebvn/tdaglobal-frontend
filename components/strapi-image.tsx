import { useState } from 'react'
import Image from 'next/image'
import { StrapiMediaRelation } from '@/types/strapi'

interface StrapiImageProps {
  media: StrapiMediaRelation | undefined
  alt: string
  width?: number
  height?: number
  className?: string
  fill?: boolean
  format?: 'thumbnail' | 'small' | 'medium' | 'large' | 'original'
}

export function StrapiImage({ 
  media, 
  alt, 
  width, 
  height, 
  className = '', 
  fill = false,
  format = 'medium' 
}: StrapiImageProps) {
  const [hasError, setHasError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Fallback image
  const fallbackImage = '/images/news1.jpg'

  const getStrapiImageUrl = () => {
    // Extract media from Strapi v5 relation structure
    const mediaData = media?.data?.attributes;
    
    if (!mediaData || hasError) return fallbackImage
    
    const baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
    
    if (format === 'original') {
      return `${baseUrl}${mediaData.url}`
    }
    
    const formatImage = mediaData.formats[format]
    if (formatImage) {
      return `${baseUrl}${formatImage.url}`
    }
    
    // Fallback to original if format not available
    return `${baseUrl}${mediaData.url}`
  }

  const handleError = () => {
    console.error('Failed to load image:', getStrapiImageUrl())
    setHasError(true)
    setIsLoading(false)
  }

  const handleLoad = () => {
    setIsLoading(false)
  }

  return (
    <div className="relative">
      <Image
        src={getStrapiImageUrl()}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${className} ${isLoading ? 'blur-sm' : ''} transition-all duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R7UnitbODw="
      />
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded" />
      )}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-400 text-sm">No image</span>
        </div>
      )}
    </div>
  )
}
