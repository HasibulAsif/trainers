import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Find Your Perfect Trainer",
      description:
        "Browse through our extensive list of qualified trainers and filter by specialty, location, and price.",
    },
    {
      number: "02",
      title: "Book a Session",
      description: "Schedule a session with your chosen trainer at a time that works for you.",
    },
    {
      number: "03",
      title: "Get Personalized Training",
      description: "Receive customized workout and nutrition plans tailored to your specific goals.",
    },
    {
      number: "04",
      title: "Track Your Progress",
      description: "Monitor your fitness journey and see real results with ongoing guidance from your trainer.",
    },
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform makes it easy to connect with the perfect fitness trainer for your needs in just a few simple
            steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-gradient-start/20 via-gradient-middle/20 to-gradient-end/20 rounded-full opacity-50 group-hover:opacity-70 transition-opacity"></div>
              <div className="relative z-10">
                <span className="text-4xl font-bold text-gradient-middle opacity-30">{step.number}</span>
                <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/how-it-works">
            <Button className="bg-gradient-to-r from-gradient-start via-gradient-middle to-gradient-end hover:opacity-90">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
