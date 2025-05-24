"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import { getTrainerReviews } from "@/lib/actions"
import type { Review } from "@/lib/types"

export default function TrainerReviewsPage() {
  // In a real app, you would get the trainer ID from authentication
  const trainerId = "trainer-456"

  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      const data = await getTrainerReviews(trainerId)
      setReviews(data)
      setLoading(false)
    }

    fetchReviews()
  }, [trainerId])

  // Calculate rating stats
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews : 0

  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      totalReviews > 0 ? (reviews.filter((review) => review.rating === rating).length / totalReviews) * 100 : 0,
  }))

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Reviews</h1>
            <p className="text-gray-600">See what your clients are saying about you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <h2 className="text-4xl font-bold text-pink-700">{averageRating.toFixed(1)}</h2>
                  <div className="flex justify-center my-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-5 w-5 ${
                          star <= Math.round(averageRating) ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-500">Based on {totalReviews} reviews</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Rating Breakdown</h3>
                <div className="space-y-3">
                  {ratingCounts.map(({ rating, count, percentage }) => (
                    <div key={rating} className="flex items-center">
                      <div className="w-20 flex items-center">
                        <span className="mr-1">{rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${percentage}%` }}></div>
                      </div>
                      <div className="w-16 text-right text-sm text-gray-500">
                        {count} ({percentage.toFixed(0)}%)
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-700 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading reviews...</p>
                </div>
              ) : reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0">
                      <div className="flex items-center mb-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                          <Image
                            src={review.user_image || "/placeholder.svg"}
                            alt={review.user_name || "Client"}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium">
                            {review.user_name || `Client ${review.client_id.substring(0, 4)}`}
                          </h4>
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="ml-2 text-xs text-gray-500">{formatDate(review.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 text-sm">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
