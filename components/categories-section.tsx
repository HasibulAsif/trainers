import { Dumbbell, Utensils, SpaceIcon as Yoga, Heart, Brain, MonitorIcon as Running, ArrowRight } from "lucide-react"

export default function CategoriesSection() {
  const categories = [
    {
      icon: <Dumbbell className="h-10 w-10 text-gradient-middle" />,
      name: "Fitness Training",
      count: 124,
    },
    {
      icon: <Yoga className="h-10 w-10 text-gradient-middle" />,
      name: "Yoga",
      count: 87,
    },
    {
      icon: <Utensils className="h-10 w-10 text-gradient-middle" />,
      name: "Nutrition",
      count: 56,
    },
    {
      icon: <Heart className="h-10 w-10 text-gradient-middle" />,
      name: "Cardio",
      count: 93,
    },
    {
      icon: <Brain className="h-10 w-10 text-gradient-middle" />,
      name: "Mindfulness",
      count: 42,
    },
    {
      icon: <Running className="h-10 w-10 text-gradient-middle" />,
      name: "Sports",
      count: 78,
    },
  ]

  return (
    <section className="py-20 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-gradient-start/5 via-gradient-middle/5 to-gradient-end/5 rounded-full -translate-x-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-gradient-start/5 via-gradient-middle/5 to-gradient-end/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>

      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end">
            Browse by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore trainers by specialty to find the perfect match for your fitness journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex items-center cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-start/5 via-gradient-middle/5 to-gradient-end/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="mr-6 relative">
                <div className="absolute inset-0 bg-gradient-middle/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
                <div className="relative">{category.icon}</div>
              </div>
              <div className="relative z-10">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-gray-500">{category.count} trainers</p>
              </div>
              <div className="absolute right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-gradient-middle" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
