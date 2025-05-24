"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, Filter, SlidersHorizontal, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import type { Category, Certification, FilterOptions, Specialization } from "@/lib/types"

interface SearchFiltersProps {
  categories: Category[]
  specializations: Specialization[]
  certifications: Certification[]
  totalResults: number
  currentFilters: FilterOptions
  onFilterChange: (filters: FilterOptions) => void
}

export default function SearchFilters({
  categories,
  specializations,
  certifications,
  totalResults,
  currentFilters,
  onFilterChange,
}: SearchFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [tempFilters, setTempFilters] = useState<FilterOptions>({ ...currentFilters })
  const [priceRange, setPriceRange] = useState<[number, number]>(currentFilters.hourlyRate || [20, 100])

  // Count active filters
  const getActiveFilterCount = () => {
    let count = 0
    if (currentFilters.hourlyRate) count++
    if (currentFilters.onlineOnly) count++
    if (currentFilters.specializations?.length) count++
    if (currentFilters.certifications?.length) count++
    return count
  }

  const handleSortChange = (value: string) => {
    const newFilters = {
      ...currentFilters,
      sortBy: value as FilterOptions["sortBy"],
    }
    onFilterChange(newFilters)
  }

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value)
    setTempFilters({
      ...tempFilters,
      hourlyRate: value,
    })
  }

  const handleSpecializationChange = (value: string, checked: boolean) => {
    const currentSpecs = tempFilters.specializations || []
    const newSpecs = checked ? [...currentSpecs, value] : currentSpecs.filter((s) => s !== value)

    setTempFilters({
      ...tempFilters,
      specializations: newSpecs.length > 0 ? newSpecs : undefined,
    })
  }

  const handleCertificationChange = (value: string, checked: boolean) => {
    const currentCerts = tempFilters.certifications || []
    const newCerts = checked ? [...currentCerts, value] : currentCerts.filter((c) => c !== value)

    setTempFilters({
      ...tempFilters,
      certifications: newCerts.length > 0 ? newCerts : undefined,
    })
  }

  const handleOnlineOnlyChange = (checked: boolean) => {
    setTempFilters({
      ...tempFilters,
      onlineOnly: checked || undefined,
    })
  }

  const applyFilters = () => {
    onFilterChange(tempFilters)
  }

  const clearFilters = () => {
    const newFilters: FilterOptions = {
      search: currentFilters.search,
      category: currentFilters.category,
    }
    setTempFilters(newFilters)
    setPriceRange([20, 100])
    onFilterChange(newFilters)
  }

  const formatPrice = (price: number) => `$${price}`

  return (
    <div className="w-full">
      {/* Results count */}
      <div className="flex items-center justify-between py-4 border-b">
        <div className="text-sm text-gray-600">
          <span className="font-medium text-gray-900">{totalResults}</span> trainers found
        </div>

        <div className="flex items-center gap-2">
          {getActiveFilterCount() > 0 && (
            <Button variant="outline" size="sm" className="h-8 text-xs" onClick={clearFilters}>
              Clear filters
              <X className="ml-1 h-3 w-3" />
            </Button>
          )}

          {/* Mobile filter button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 md:hidden">
                <Filter className="h-3.5 w-3.5 mr-1" />
                Filters
                {getActiveFilterCount() > 0 && (
                  <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                    {getActiveFilterCount()}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-md overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>

              <div className="py-6 space-y-6">
                {/* Price Range */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Hourly Rate</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={priceRange}
                      min={20}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={(value) => handlePriceChange(value as [number, number])}
                      className="mb-6"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{formatPrice(priceRange[0])}</span>
                      <span>{formatPrice(priceRange[1])}</span>
                    </div>
                  </div>
                </div>

                {/* Online Only */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Availability</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="online-only-mobile"
                        checked={tempFilters.onlineOnly}
                        onCheckedChange={(checked) => handleOnlineOnlyChange(checked as boolean)}
                      />
                      <label
                        htmlFor="online-only-mobile"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Online sessions available
                      </label>
                    </div>
                  </div>
                </div>

                {/* Specializations */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Specializations</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {specializations.map((spec) => (
                      <div key={spec.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`spec-mobile-${spec.id}`}
                          checked={tempFilters.specializations?.includes(spec.name)}
                          onCheckedChange={(checked) => handleSpecializationChange(spec.name, checked as boolean)}
                        />
                        <label
                          htmlFor={`spec-mobile-${spec.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {spec.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4">
                  <h3 className="font-medium text-sm">Certifications</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                    {certifications.map((cert) => (
                      <div key={cert.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`cert-mobile-${cert.id}`}
                          checked={tempFilters.certifications?.includes(cert.abbreviation)}
                          onCheckedChange={(checked) =>
                            handleCertificationChange(cert.abbreviation, checked as boolean)
                          }
                        />
                        <label
                          htmlFor={`cert-mobile-${cert.id}`}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {cert.name} ({cert.abbreviation})
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <SheetFooter className="pt-4 border-t flex-row space-x-2">
                <SheetClose asChild>
                  <Button variant="outline" className="flex-1">
                    Cancel
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button className="flex-1" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>

          {/* Sort dropdown */}
          <div className="relative group">
            <Button variant="outline" size="sm" className="h-8 flex items-center gap-1">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sort by:</span>
              <span className="font-medium">
                {currentFilters.sortBy === "price_low_high"
                  ? "Price: Low-High"
                  : currentFilters.sortBy === "price_high_low"
                    ? "Price: High-Low"
                    : currentFilters.sortBy === "most_reviews"
                      ? "Most Reviews"
                      : "Best Match"}
              </span>
              <ChevronDown className="h-3.5 w-3.5 ml-1" />
            </Button>

            <div className="absolute right-0 mt-1 w-48 bg-white shadow-lg rounded-md border border-gray-100 overflow-hidden z-10 hidden group-hover:block">
              <div className="py-1">
                {[
                  { value: "best_match", label: "Best Match" },
                  { value: "price_low_high", label: "Price: Low-High" },
                  { value: "price_high_low", label: "Price: High-Low" },
                  { value: "most_reviews", label: "Most Reviews" },
                ].map((option) => (
                  <button
                    key={option.value}
                    className={`flex items-center w-full px-4 py-2 text-sm ${
                      currentFilters.sortBy === option.value
                        ? "bg-gray-50 text-pink-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => handleSortChange(option.value)}
                  >
                    {currentFilters.sortBy === option.value && <Check className="h-3.5 w-3.5 mr-2" />}
                    <span className={currentFilters.sortBy === option.value ? "" : "ml-5"}>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop filters */}
      <div className="hidden md:flex items-center gap-4 py-4 border-b">
        {/* Price Range Filter */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 ${currentFilters.hourlyRate ? "border-pink-700 text-pink-700" : ""}`}
          >
            Hourly Rate
            <ChevronDown className="h-3.5 w-3.5 ml-1" />
          </Button>

          <div className="absolute left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-100 p-4 z-10 hidden group-hover:block">
            <h3 className="font-medium text-sm mb-4">Hourly Rate</h3>
            <Slider
              defaultValue={priceRange}
              min={20}
              max={100}
              step={5}
              value={priceRange}
              onValueChange={(value) => handlePriceChange(value as [number, number])}
              className="mb-6"
            />
            <div className="flex justify-between text-sm text-gray-500">
              <span>{formatPrice(priceRange[0])}</span>
              <span>{formatPrice(priceRange[1])}</span>
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  onFilterChange({
                    ...currentFilters,
                    hourlyRate: priceRange,
                  })
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Specializations Filter */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 ${currentFilters.specializations?.length ? "border-pink-700 text-pink-700" : ""}`}
          >
            Specializations
            {currentFilters.specializations?.length ? (
              <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                {currentFilters.specializations.length}
              </Badge>
            ) : (
              <ChevronDown className="h-3.5 w-3.5 ml-1" />
            )}
          </Button>

          <div className="absolute left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-100 p-4 z-10 hidden group-hover:block">
            <h3 className="font-medium text-sm mb-4">Specializations</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {specializations.map((spec) => (
                <div key={spec.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`spec-${spec.id}`}
                    checked={tempFilters.specializations?.includes(spec.name)}
                    onCheckedChange={(checked) => handleSpecializationChange(spec.name, checked as boolean)}
                  />
                  <label
                    htmlFor={`spec-${spec.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {spec.name}
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  onFilterChange({
                    ...currentFilters,
                    specializations: tempFilters.specializations,
                  })
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Certifications Filter */}
        <div className="relative group">
          <Button
            variant="outline"
            size="sm"
            className={`h-8 ${currentFilters.certifications?.length ? "border-pink-700 text-pink-700" : ""}`}
          >
            Certifications
            {currentFilters.certifications?.length ? (
              <Badge className="ml-1 h-4 w-4 p-0 flex items-center justify-center text-[10px]">
                {currentFilters.certifications.length}
              </Badge>
            ) : (
              <ChevronDown className="h-3.5 w-3.5 ml-1" />
            )}
          </Button>

          <div className="absolute left-0 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-100 p-4 z-10 hidden group-hover:block">
            <h3 className="font-medium text-sm mb-4">Certifications</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {certifications.map((cert) => (
                <div key={cert.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`cert-${cert.id}`}
                    checked={tempFilters.certifications?.includes(cert.abbreviation)}
                    onCheckedChange={(checked) => handleCertificationChange(cert.abbreviation, checked as boolean)}
                  />
                  <label
                    htmlFor={`cert-${cert.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cert.name} ({cert.abbreviation})
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end">
              <Button
                size="sm"
                onClick={() => {
                  onFilterChange({
                    ...currentFilters,
                    certifications: tempFilters.certifications,
                  })
                }}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>

        {/* Online Only Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="online-only"
            checked={currentFilters.onlineOnly}
            onCheckedChange={(checked) => {
              onFilterChange({
                ...currentFilters,
                onlineOnly: (checked as boolean) || undefined,
              })
            }}
          />
          <label
            htmlFor="online-only"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Online sessions available
          </label>
        </div>
      </div>

      {/* Active filters */}
      {getActiveFilterCount() > 0 && (
        <div className="flex items-center gap-2 py-3 flex-wrap">
          <span className="text-sm text-gray-500">Active filters:</span>

          {currentFilters.hourlyRate && (
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              ${currentFilters.hourlyRate[0]}-${currentFilters.hourlyRate[1]}/hr
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() =>
                  onFilterChange({
                    ...currentFilters,
                    hourlyRate: undefined,
                  })
                }
              />
            </Badge>
          )}

          {currentFilters.onlineOnly && (
            <Badge variant="outline" className="flex items-center gap-1 py-1">
              Online Available
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() =>
                  onFilterChange({
                    ...currentFilters,
                    onlineOnly: undefined,
                  })
                }
              />
            </Badge>
          )}

          {currentFilters.specializations?.map((spec) => (
            <Badge key={spec} variant="outline" className="flex items-center gap-1 py-1">
              {spec}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  const newSpecs = currentFilters.specializations?.filter((s) => s !== spec)
                  onFilterChange({
                    ...currentFilters,
                    specializations: newSpecs?.length ? newSpecs : undefined,
                  })
                }}
              />
            </Badge>
          ))}

          {currentFilters.certifications?.map((cert) => (
            <Badge key={cert} variant="outline" className="flex items-center gap-1 py-1">
              {cert}
              <X
                className="h-3 w-3 ml-1 cursor-pointer"
                onClick={() => {
                  const newCerts = currentFilters.certifications?.filter((c) => c !== cert)
                  onFilterChange({
                    ...currentFilters,
                    certifications: newCerts?.length ? newCerts : undefined,
                  })
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
