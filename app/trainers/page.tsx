import { Suspense } from "react"
import TrainersResults from "./trainers-results"
import { mockCategories, mockSpecializations, mockCertifications } from "@/lib/mock-data"

interface TrainersPageProps {
  searchParams: {
    q?: string
    category?: string
    minPrice?: string
    maxPrice?: string
    specializations?: string | string[]
    certifications?: string | string[]
    onlineOnly?: string
    sortBy?: string
  }
}

export default async function TrainersPage({ searchParams }: TrainersPageProps) {
  // Parse search params
  const search = searchParams.q || ""
  const category = searchParams.category || ""

  // Parse price range
  const minPrice = searchParams.minPrice ? Number.parseInt(searchParams.minPrice) : undefined
  const maxPrice = searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice) : undefined
  const hourlyRate = minPrice && maxPrice ? ([minPrice, maxPrice] as [number, number]) : undefined

  // Parse specializations
  const specializations = searchParams.specializations
    ? Array.isArray(searchParams.specializations)
      ? searchParams.specializations
      : [searchParams.specializations]
    : undefined

  // Parse certifications
  const certifications = searchParams.certifications
    ? Array.isArray(searchParams.certifications)
      ? searchParams.certifications
      : [searchParams.certifications]
    : undefined

  // Parse online only
  const onlineOnly = searchParams.onlineOnly === "true"

  // Parse sort by
  const sortBy = (searchParams.sortBy as any) || "best_match"

  // Use mock data instead of fetching from Supabase
  const categories = mockCategories
  const specializationsData = mockSpecializations
  const certificationsData = mockCertifications

  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<div className="container mx-auto py-8">Loading trainers...</div>}>
        <TrainersResults
          initialSearch={search}
          initialCategory={category}
          initialHourlyRate={hourlyRate}
          initialSpecializations={specializations}
          initialCertifications={certifications}
          initialOnlineOnly={onlineOnly}
          initialSortBy={sortBy}
          categories={categories}
          specializations={specializationsData}
          certifications={certificationsData}
        />
      </Suspense>
    </main>
  )
}
