"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function HeroSection() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const trainerCategories = ["Nutritionists", "Yoga Trainer", "Fitness Trainer", "Personal Trainer", "CrossFit Coach"]

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/trainers?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleCategoryClick = (category: string) => {
    router.push(`/trainers?q=${encodeURIComponent(category)}`)
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/hero-background.png" alt="Fitness trainers" fill priority className="object-cover" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto h-full flex items-center">
        <div className="max-w-lg pt-40 md:pt-48">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 leading-tight">
            Hire The Best Trainers in Bangladesh
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSearch}>
            <div
              className={cn(
                "bg-black/20 backdrop-blur-md border border-white/20 rounded-lg p-1 flex items-center transition-all duration-300",
                isSearchFocused ? "ring-2 ring-gradient-middle/70 shadow-lg shadow-gradient-middle/20" : "",
              )}
            >
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Search for trainers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full bg-transparent text-white placeholder-white/70 px-4 py-2 outline-none text-base"
                />
              </div>
              <Button
                type="submit"
                className={cn(
                  "bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end hover:opacity-90 text-white px-4 py-2 h-auto rounded-md transition-all duration-500 flex items-center gap-1.5 relative overflow-hidden group",
                  isSearchFocused ? "shadow-lg shadow-gradient-middle/30" : "",
                )}
              >
                <span className="relative z-10">Search</span>
                <Search className="w-4 h-4 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-gradient-start/90 via-gradient-middle/90 to-gradient-end/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-gradient-start/50 via-gradient-middle/50 to-gradient-end/50 opacity-0 group-hover:opacity-50 blur-lg transition-opacity duration-300 z-0"></div>
              </Button>
            </div>
          </form>

          {/* Suggested Categories */}
          <div className="mt-4">
            <p className="text-white/80 text-sm mb-2">Popular searches:</p>
            <div className="flex flex-wrap gap-2">
              {trainerCategories.map((category, index) => (
                <button
                  key={index}
                  className="bg-black/20 hover:bg-black/30 backdrop-blur-sm text-white px-3 py-1.5 rounded-full border border-white/10 transition-all duration-200 hover:border-gradient-middle/50 hover:shadow-md hover:shadow-gradient-middle/20 text-sm"
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
