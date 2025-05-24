import { getCategories } from "@/lib/actions"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default async function CategoriesPage() {
  const categories = await getCategories()

  // Sample category images and descriptions for demonstration
  const categoryDetails = {
    "Weight Training": {
      image: "/placeholder.svg?height=400&width=600",
      description: "Build strength and muscle with personalized weight training programs.",
      trainers: 48,
    },
    Cardio: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Improve your cardiovascular health and endurance with specialized cardio training.",
      trainers: 36,
    },
    Yoga: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Enhance flexibility, strength, and mental wellbeing through yoga practices.",
      trainers: 29,
    },
    Pilates: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Focus on core strength, posture, and balanced muscle development.",
      trainers: 22,
    },
    Nutrition: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Get expert guidance on nutrition planning for optimal health and fitness results.",
      trainers: 31,
    },
    CrossFit: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Challenge yourself with high-intensity functional movements for overall fitness.",
      trainers: 18,
    },
    "Martial Arts": {
      image: "/placeholder.svg?height=400&width=600",
      description: "Learn self-defense while improving discipline, coordination, and fitness.",
      trainers: 15,
    },
    Meditation: {
      image: "/placeholder.svg?height=400&width=600",
      description: "Develop mindfulness and mental clarity through guided meditation practices.",
      trainers: 12,
    },
  }

  return (
    <main>
      <div className="pt-20 pb-16 bg-gradient-to-br from-purple-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-purple-700">
              Explore Training Categories
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover specialized trainers across various fitness disciplines to help you achieve your wellness goals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const details = categoryDetails[category.name as keyof typeof categoryDetails] || {
                image: "/placeholder.svg?height=400&width=600",
                description: "Find expert trainers specializing in this category.",
                trainers: Math.floor(Math.random() * 30) + 10,
              }

              return (
                <Link
                  key={category.id}
                  href={`/trainers?category=${category.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={details.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4 w-full">
                      <h3 className="text-white text-xl font-bold">{category.name}</h3>
                      <p className="text-white/80 text-sm">{details.trainers} Trainers</p>
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{details.description}</p>
                    <div className="flex items-center text-pink-700 font-medium group-hover:text-purple-700 transition-colors">
                      <span>Find Trainers</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </main>
  )
}
