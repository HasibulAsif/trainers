import Image from "next/image"
import { Star, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeaturedTrainers() {
  const trainers = [
    {
      name: "Rahima Khan",
      specialty: "Yoga Trainer",
      rating: 4.9,
      reviews: 127,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Kamal Ahmed",
      specialty: "Fitness Trainer",
      rating: 4.8,
      reviews: 93,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Nusrat Jahan",
      specialty: "Nutritionist",
      rating: 4.7,
      reviews: 85,
      image: "/placeholder.svg?height=400&width=300",
    },
    {
      name: "Farhan Rahman",
      specialty: "CrossFit Coach",
      rating: 4.9,
      reviews: 112,
      image: "/placeholder.svg?height=400&width=300",
    },
  ]

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end">
            Featured Trainers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated fitness professionals who are ready to help you achieve your health and fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 group relative"
            >
              <div className="absolute inset-x-0 -top-px h-0.5 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={trainer.image || "/placeholder.svg"}
                  alt={trainer.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6 relative">
                <h3 className="text-xl font-semibold mb-1">{trainer.name}</h3>
                <p className="text-gradient-middle mb-3 font-medium">{trainer.specialty}</p>
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                  <span className="ml-1 font-medium">{trainer.rating}</span>
                  <span className="ml-1 text-gray-500">({trainer.reviews} reviews)</span>
                </div>
                <Button className="w-full bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end hover:opacity-90 group-hover:shadow-md group-hover:shadow-gradient-middle/20 transition-all duration-300">
                  <span>View Profile</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-gradient-middle text-gradient-middle hover:bg-gradient-middle/5 group">
            <span>View All Trainers</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
