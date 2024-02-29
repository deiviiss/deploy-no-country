'use client'

import { useEffect } from 'react'
import { useFeaturedPropertiesContext } from '../context'
import { SearchBar } from '@/components/SearchBar/SearchBar'

export default function Search (router): JSX.Element {
  const contextFeaturedProperties = useFeaturedPropertiesContext()

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/featured-properties')
        const data = await response.json()
        const newArray = [] as any
        for (let index = 0; index < 3; index++) {
          newArray.push(data[index])
        }
        contextFeaturedProperties.setTestArray(newArray)
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchDatos()
  }, [])

  return (
    <div>
    <SearchBar testArray={contextFeaturedProperties.testArray} router={router} initialShowResults={true}></SearchBar></div>
  )
}