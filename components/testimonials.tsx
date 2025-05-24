import Image from "next/image"
import { Star, Quote } from "lucide-react"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Tasnim Ahmed",
      image: "/placeholder.svg?height=100&width=100",
      role: "Yoga Enthusiast",
      content:
        "Finding a yoga trainer on HealthyThako was the best decision I made for my wellness journey. My trainer understood exactly what I needed and customized sessions perfectly.",
      rating: 5,
    },
    {
      name: "Rafiq Islam",
      image: "/placeholder.svg?height=100&width=100",
      role: "Fitness Beginner",
      content:
        "As someone new to fitness, I was nervous about hiring a trainer. HealthyThako made it easy to find someone patient and knowledgeable who helped me build confidence.",
      rating: 5,
    },
    {
      name: "Sabrina Khan",
      image: "/placeholder.svg?height=100&width=100",
      role: "Marathon Runner",
      content:
        "The specialized trainers on this platform helped me prepare for my first marathon. The expertise and personalized training plan made all the difference in my performance.",
      rating: 4,
    },
  ]

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end">
            What Our Clients Say
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from people who have transformed their fitness journey with trainers from HealthyThako.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 p-8 rounded-xl relative group hover:shadow-lg transition-all duration-300 border border-gray-100"
            >
              <div className="absolute top-6 right-6 text-gradient-middle/20 group-hover:text-gradient-middle/30 transition-colors duration-300">
                <Quote className="h-12 w-12 rotate-180" />
              </div>
              <div className="flex items-center mb-6 relative z-10">
                <div className="relative h-14 w-14 rounded-full overflow-hidden mr-4 border-2 border-white shadow-md">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-gradient-middle text-sm font-medium">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-700 relative z-10">{testimonial.content}</p>
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end rounded-b-xl transition-all duration-500 w-0 group-hover:w-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
