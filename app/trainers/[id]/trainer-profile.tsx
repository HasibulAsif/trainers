"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Star, Clock, Calendar, MessageCircle, Award, CheckCircle, ChevronRight, Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import BookingModal from "@/components/booking-modal"
import ContactModal from "@/components/contact-modal"
import ReviewsModal from "@/components/reviews-modal"
import { getTrainerReviews, getSimilarTrainers } from "@/lib/actions"
import type { Review, Trainer } from "@/lib/types"

interface TrainerProfileProps {
  trainerId: string
  initialTrainer: Trainer
}

export default function TrainerProfile({ trainerId, initialTrainer }: TrainerProfileProps) {
  const [trainer, setTrainer] = useState<Trainer>(initialTrainer)
  const [reviews, setReviews] = useState<Review[]>([])
  const [similarTrainers, setSimilarTrainers] = useState<Trainer[]>([])
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isReviewsModalOpen, setIsReviewsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // Mock availability data
  const availability = [
    { day: "Monday", slots: ["Morning", "Evening"] },
    { day: "Tuesday", slots: ["Morning", "Afternoon", "Evening"] },
    { day: "Wednesday", slots: ["Afternoon"] },
    { day: "Thursday", slots: ["Morning", "Evening"] },
    { day: "Friday", slots: ["Morning", "Afternoon"] },
    { day: "Saturday", slots: ["Morning"] },
    { day: "Sunday", slots: [] },
  ]

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // Fetch reviews
        const reviewsData = await getTrainerReviews(trainerId)
        setReviews(reviewsData)

        // Fetch similar trainers
        if (trainer.categories && trainer.categories.length > 0) {
          const similarTrainersData = await getSimilarTrainers(trainerId, trainer.categories)
          setSimilarTrainers(similarTrainersData)
        }
      } catch (error) {
        console.error("Error fetching trainer data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [trainerId, trainer.categories])

  return (
    <>
      <div className="bg-gradient-to-r from-pink-700 to-purple-700 h-40 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxkZWZzPjxwYXR0ZXJuIGlkPSJwYXR0ZXJuIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzMCkiPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyIiBoZWlnaHQ9IjIiIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 -mt-20 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Trainer info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile header */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <div className="relative h-24 w-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4 sm:mb-0 sm:mr-6">
                    <Image
                      src={trainer.profile_image || "/placeholder.svg"}
                      alt={trainer.name}
                      fill
                      className="object-cover"
                    />
                    {trainer.rating >= 4.8 && (
                      <div className="absolute bottom-0 right-0 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center border-2 border-white">
                        <span className="text-[10px] text-white">✓</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h1 className="text-2xl font-bold">{trainer.name}</h1>
                        <p className="text-pink-700 font-medium">{trainer.title}</p>
                      </div>
                      <div className="mt-3 sm:mt-0 text-right">
                        <div className="text-2xl font-bold text-pink-700">${trainer.hourly_rate}/hr</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-500 mr-1" />
                        <span className="text-gray-700">{trainer.location}</span>
                        {trainer.online_available && (
                          <Badge variant="pink" className="ml-2 text-[10px] py-0 px-1.5">
                            Online
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="font-medium">{trainer.rating}</span>
                        <button
                          onClick={() => setIsReviewsModalOpen(true)}
                          className="ml-1 text-sm text-gray-500 hover:text-pink-700 hover:underline"
                        >
                          ({trainer.review_count} reviews)
                        </button>
                      </div>
                      {trainer.experience_years && (
                        <div className="flex items-center">
                          <Award className="h-4 w-4 text-gray-500 mr-1" />
                          <span className="text-gray-700">{trainer.experience_years} years experience</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Categories and specializations */}
                <div className="mt-6">
                  {trainer.categories && trainer.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {trainer.categories.map((category, index) => (
                        <Badge key={index} variant="secondary" className="text-xs py-1 px-2">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {trainer.specializations && trainer.specializations.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {trainer.specializations.map((spec, index) => (
                        <Badge key={index} variant="purple" className="text-xs py-1 px-2">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="flex-1 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600 shadow-md shadow-pink-700/20"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a Session
                  </Button>
                  <Button
                    onClick={() => setIsContactModalOpen(true)}
                    variant="outline"
                    className="flex-1 border-pink-700 text-pink-700 hover:bg-pink-50"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Contact Trainer
                  </Button>
                </div>
              </div>
            </div>

            {/* About section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-semibold mb-4">About {trainer.name}</h2>
                <p className="text-gray-700 mb-6">{trainer.bio}</p>

                {/* Certifications */}
                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3">Certifications</h3>
                    <div className="space-y-2">
                      {trainer.certifications.map((cert, index) => (
                        <div key={index} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          <span>
                            {cert.name} ({cert.abbreviation})
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Languages */}
                {trainer.languages && trainer.languages.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-3">Languages</h3>
                    <div className="flex items-center">
                      <Languages className="h-5 w-5 text-gray-500 mr-2" />
                      <span>{trainer.languages.join(", ")}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Reviews section */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6 sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsReviewsModalOpen(true)}
                    className="text-pink-700 hover:text-pink-800 hover:bg-pink-50"
                  >
                    View All
                    <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>

                {loading ? (
                  <div className="py-8 text-center">
                    <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-pink-700 border-r-transparent"></div>
                    <p className="mt-2 text-gray-500">Loading reviews...</p>
                  </div>
                ) : reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.slice(0, 3).map((review) => (
                      <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                        <div className="flex items-center mb-3">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image
                              src={review.user_image || "/placeholder.svg"}
                              alt={review.user_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium">{review.user_name}</h4>
                            <div className="flex items-center">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3.5 w-3.5 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`}
                                />
                              ))}
                              <span className="ml-2 text-xs text-gray-500">
                                {new Date(review.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-gray-500">No reviews yet for this trainer.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column - Sidebar */}
          <div className="space-y-8">
            {/* Availability */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Availability</h2>
                <div className="space-y-3">
                  {availability.map((day) => (
                    <div
                      key={day.day}
                      className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium">{day.day}</span>
                      {day.slots.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {day.slots.map((slot) => (
                            <Badge key={slot} variant="outline" className="text-xs">
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500 text-sm">Unavailable</span>
                      )}
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="w-full mt-6 bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Check Available Times
                </Button>
              </div>
            </div>

            {/* Similar trainers */}
            {similarTrainers.length > 0 && (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Similar Trainers</h2>
                  <div className="space-y-4">
                    {similarTrainers.slice(0, 3).map((similarTrainer) => (
                      <div
                        key={similarTrainer.id}
                        className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative h-12 w-12 rounded-full overflow-hidden mr-3">
                          <Image
                            src={similarTrainer.profile_image || "/placeholder.svg"}
                            alt={similarTrainer.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{similarTrainer.name}</h4>
                          <p className="text-gray-600 text-xs truncate">{similarTrainer.title}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                            <span className="ml-1 text-xs">{similarTrainer.rating}</span>
                            <span className="mx-1 text-gray-300">•</span>
                            <span className="text-xs text-gray-500">${similarTrainer.hourly_rate}/hr</span>
                          </div>
                        </div>
                        <Link href={`/trainers/${similarTrainer.id}`}>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                  <Link href="/trainers" className="block mt-4 text-center text-sm text-pink-700 hover:underline">
                    View all trainers
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <BookingModal trainer={trainer} isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
      <ContactModal trainer={trainer} isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
      <ReviewsModal
        trainer={trainer}
        reviews={reviews}
        isOpen={isReviewsModalOpen}
        onClose={() => setIsReviewsModalOpen(false)}
      />
    </>
  )
}
