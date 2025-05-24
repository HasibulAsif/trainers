"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TrainerCard from "@/components/trainer-card"
import SearchFilters from "@/components/search-filters"
import type { Category, Certification, FilterOptions, Specialization, Trainer } from "@/lib/types"
import { mockSearchTrainers } from "@/lib/mock-data"

interface TrainersResultsProps {
  initialSearch: string
  initialCategory: string
  initialHourlyRate?: [number, number]
  initialSpecializations?: string[]
  initialCertifications?: string[]
  initialOnlineOnly: boolean
  initialSortBy: string
  categories: Category[]
  specializations: Specialization[]
  certifications: Certification[]
}

export default function TrainersResults({
  initialSearch,
  initialCategory,
  initialHourlyRate,
  initialSpecializations,
  initialCertifications,
  initialOnlineOnly,
  initialSortBy,
  categories,
  specializations,
  certifications,
}: TrainersResultsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(initialSearch)
  const [filters, setFilters] = useState<FilterOptions>({
    search: initialSearch,
    category: initialCategory,
    hourlyRate: initialHourlyRate,
    specializations: initialSpecializations,
    certifications: initialCertifications,
    onlineOnly: initialOnlineOnly,
    sortBy: initialSortBy as FilterOptions["sortBy"],
  })

  const [trainers, setTrainers] = useState<Trainer[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [loading, setLoading] = useState(true)

  // Fetch trainers when filters change
  useEffect(() => {
    const fetchTrainers = async () => {
      setLoading(true)
      try {
        console.log("Fetching trainers with filters:", filters)
        const { trainers, count } = await mockSearchTrainers(filters)
        console.log("Fetched trainers:", trainers.length)
        setTrainers(trainers)
        setTotalResults(count)
      } catch (error) {
        console.error("Error fetching trainers:", error)
        // Set empty results on error
        setTrainers([])
        setTotalResults(0)
      } finally {
        setLoading(false)
      }
    }

    fetchTrainers()
  }, [filters])

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.search) params.set("q", filters.search)
    if (filters.category) params.set("category", filters.category)

    if (filters.hourlyRate) {
      params.set("minPrice", filters.hourlyRate[0].toString())
      params.set("maxPrice", filters.hourlyRate[1].toString())
    }

    if (filters.specializations?.length) {
      filters.specializations.forEach((spec) => {
        params.append("specializations", spec)
      })
    }

    if (filters.certifications?.length) {
      filters.certifications.forEach((cert) => {
        params.append("certifications", cert)
      })
    }

    if (filters.onlineOnly) params.set("onlineOnly", "true")
    if (filters.sortBy) params.set("sortBy", filters.sortBy)

    const newUrl = `/trainers${params.toString() ? `?${params.toString()}` : ""}`
    router.push(newUrl, { scroll: false })
  }, [filters, router])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters({
      ...filters,
      search: searchQuery,
    })
  }

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters({
      ...filters,
      ...newFilters,
    })
  }

  const handleCategoryClick = (categorySlug: string) => {
    setFilters({
      ...filters,
      category: categorySlug === filters.category ? "" : categorySlug,
    })
  }

  return (
    <div className="container mx-auto py-8">
      {/* Search bar */}
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search trainers, yoga instructors, or nutritionists..."
            className="w-full pl-10 h-12 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-pink-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <Button
            type="submit"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 h-10"
          >
            Search
          </Button>
        </form>
      </div>

      {/* Categories */}
      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex space-x-2 min-w-max">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={filters.category === category.slug ? "default" : "outline"}
              className={`whitespace-nowrap ${
                filters.category === category.slug
                  ? "bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                  : ""
              }`}
              onClick={() => handleCategoryClick(category.slug)}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <SearchFilters
        categories={categories}
        specializations={specializations}
        certifications={certifications}
        totalResults={totalResults}
        currentFilters={filters}
        onFilterChange={handleFilterChange}
      />

      {/* Results */}
      {loading ? (
        <div className="py-12 text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-700 border-r-transparent"></div>
          <p className="mt-4 text-gray-600">Loading trainers...</p>
        </div>
      ) : trainers.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-6">
          {trainers.map((trainer) => (
            <TrainerCard key={trainer.id} trainer={trainer} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-gray-600">No trainers found matching your criteria.</p>
          <Button
            variant="link"
            className="text-pink-700 mt-2"
            onClick={() =>
              setFilters({
                search: "",
                category: "",
              })
            }
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  )
}
