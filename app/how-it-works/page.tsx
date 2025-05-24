"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Search, Calendar, MessageSquare, Star, FileText } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-pink-700" />,
      title: "Find Your Trainer",
      description:
        "Browse through our extensive list of qualified trainers. Filter by specialty, location, price, and ratings to find the perfect match for your fitness goals.",
    },
    {
      icon: <Calendar className="h-10 w-10 text-pink-700" />,
      title: "Book a Session",
      description:
        "Schedule a session with your chosen trainer. Select a time that works for you and choose between in-person or online training options.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-pink-700" />,
      title: "Communicate Directly",
      description:
        "Chat with your trainer to discuss your goals, preferences, and any questions you might have before your first session.",
    },
    {
      icon: <FileText className="h-10 w-10 text-pink-700" />,
      title: "Get Personalized Plans",
      description:
        "Receive customized workout, nutrition, and meal plans tailored to your specific needs and fitness objectives.",
    },
    {
      icon: <Star className="h-10 w-10 text-pink-700" />,
      title: "Track Progress & Review",
      description:
        "Monitor your progress, provide feedback, and leave reviews to help other users find the right trainer for their needs.",
    },
  ]

  const benefits = [
    {
      title: "Verified Professionals",
      description: "All trainers are vetted and certified in their respective specialties.",
    },
    {
      title: "Flexible Training Options",
      description: "Choose between in-person sessions or convenient online training.",
    },
    {
      title: "Personalized Approach",
      description: "Get customized plans that align with your unique fitness goals.",
    },
    {
      title: "Secure Payments",
      description: "Our platform ensures safe and transparent payment processing.",
    },
    {
      title: "Ongoing Support",
      description: "Continuous guidance and motivation throughout your fitness journey.",
    },
    {
      title: "Community Connection",
      description: "Join a community of like-minded individuals pursuing better health.",
    },
  ]

  return (
    <main>
      <div className="pt-20 pb-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-100 to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-purple-700">
              How HealthyThako Trainers Works
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              We connect you with expert fitness trainers to help you achieve your health and wellness goals through a
              simple, streamlined process.
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/trainers">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                >
                  Find a Trainer
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Become a Trainer
              </Button>
            </div>
          </div>
        </div>

        {/* Steps Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Your Journey to Better Fitness</h2>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 -translate-x-1/2"></div>
            <div className="space-y-12 md:space-y-0 relative">
              {steps.map((step, index) => (
                <div key={index} className="md:flex items-center">
                  <div
                    className={`md:w-1/2 ${
                      index % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16 md:order-1"
                    } mb-6 md:mb-24`}
                  >
                    <div
                      className={`flex items-center ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} mb-4`}
                    >
                      <div className="bg-purple-50 p-3 rounded-full">{step.icon}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-r from-pink-700 to-purple-700 border-4 border-white z-10">
                    <div className="flex items-center justify-center h-full text-white font-bold">{index + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose HealthyThako Trainers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                    <h3 className="text-lg font-semibold">{benefit.title}</h3>
                  </div>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="bg-gradient-to-r from-pink-700 to-purple-700 text-white rounded-2xl p-10 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-pattern opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Transform Your Fitness Journey?</h2>
              <p className="text-white/80 max-w-2xl mx-auto mb-8">
                Join thousands of satisfied clients who have achieved their fitness goals with HealthyThako Trainers.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/trainers">
                  <Button size="lg" variant="secondary">
                    Browse Trainers
                  </Button>
                </Link>
                <Button
                  size="lg"
                  className="bg-white text-pink-700 hover:bg-gray-100"
                  onClick={() => {
                    // Open auth modal with signup tab
                  }}
                >
                  Sign Up Now
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                question: "How do I choose the right trainer for me?",
                answer:
                  "Consider your fitness goals, preferred training style, budget, and schedule. Read trainer profiles, reviews, and specializations to find the best match. You can also message trainers before booking to ask questions.",
              },
              {
                question: "Can I cancel or reschedule my session?",
                answer:
                  "Yes, you can reschedule or cancel sessions according to the trainer's cancellation policy. Most trainers require 24-48 hours notice for cancellations to avoid charges.",
              },
              {
                question: "How do payments work?",
                answer:
                  "Payments are processed securely through our platform. You'll be charged after booking a session, and trainers receive payment after the session is completed.",
              },
              {
                question: "Are online sessions as effective as in-person training?",
                answer:
                  "Online sessions can be very effective with the right trainer and approach. Many clients appreciate the convenience and flexibility of online training while still receiving personalized guidance.",
              },
              {
                question: "How are trainers verified?",
                answer:
                  "All trainers undergo a verification process that includes checking certifications, qualifications, and experience. We also collect and monitor client reviews to ensure quality.",
              },
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
