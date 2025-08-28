import { useState, useEffect, useCallback } from 'react'

interface Category {
  id: string
  name: string
  count?: number
}

interface UseCategoriesReturn {
  categories: Category[]
  loading: boolean
  error: string | null
  refetch: () => void
}

export function useCategories(): UseCategoriesReturn {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'
      const response = await fetch(`${STRAPI_URL}/api/categories?populate=*`)
      
      if (!response.ok) {
        throw new Error('Failed to fetch categories')
      }
      
      const data = await response.json()
      
      // Transform Strapi data to our format
      const transformedCategories: Category[] = data.data.map((item: {
        documentId: string
        name: string
        count?: number
      }) => ({
        id: item.documentId,
        name: item.name,
        count: item.count || 0
      }))
      
      setCategories(transformedCategories)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      console.error('Error fetching categories:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const refetch = useCallback(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    categories,
    loading,
    error,
    refetch
  }
}
