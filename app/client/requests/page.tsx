"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, DollarSign, Filter, MapPin, Plus, Search, Star } from "lucide-react"

export default function ClientRequestsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("active")

  // Mock data for client requests
  const activeRequests = [
    {
      id: "req-001",
      title: "Looking for a Weight Loss Specialist",
      category: "Weight Loss",
      description:
        "I'm looking for a trainer to help me lose 20 pounds in the next 3 months. I prefer someone who specializes in nutrition and cardio workouts.",
      budget: "$50-70/hour",
      sessionType: "In-person",
      frequency: "2-3 times per week",
      location: "New York, NY",
      postedAt: "2 days ago",
      status: "Open",
      bids: 5,
    },
    {
      id: "req-002",
      title: "Yoga Instructor for Beginners",
      category: "Yoga",
      description:
        "Complete beginner looking to start yoga practice. Need someone patient who can teach the basics and help with flexibility.",
      budget: "$40-60/hour",
      sessionType: "Online",
      frequency: "Once a week",
      location: "Remote",
      postedAt: "5 days ago",
      status: "Open",
      bids: 8,
    },
  ]

  const completedRequests = [
    {
      id: "req-003",
      title: "Strength Training Coach",
      category: "Strength Training",
      description:
        "Looking for a trainer to help me build muscle and improve overall strength. I have some experience with weightlifting but need guidance on proper form and programming.",
      budget: "$60-80/hour",
      sessionType: "In-person",
      frequency: "3 times per week",
      location: "Chicago, IL",
      postedAt: "2 weeks ago",
      status: "Completed",
      bids: 12,
      hiredTrainer: {
        name: "Michael Johnson",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.9,
      },
    },
    {
      id: "req-004",
      title: "Nutrition Coach for Athletic Performance",
      category: "Nutrition",
      description:
        "Amateur athlete looking for nutrition guidance to improve performance. Need help with meal planning and timing around workouts.",
      budget: "$70-90/hour",
      sessionType: "Online",
      frequency: "Bi-weekly sessions",
      location: "Remote",
      postedAt: "1 month ago",
      status: "Completed",
      bids: 7,
      hiredTrainer: {
        name: "Sarah Williams",
        image: "/placeholder.svg?height=40&width=40",
        rating: 4.8,
      },
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="client" />
      <div className="flex-1">
        <DashboardHeader userType="client" />
        <main className="p-6">
          <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">My Training Requests</h1>
              <p className="text-gray-600">Manage your training requests and review trainer bids</p>
            </div>
            <Button
              onClick={() => router.push("/client/requests/create")}
              className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Request
            </Button>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search requests..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="most_bids">Most Bids</option>
                <option value="least_bids">Least Bids</option>
              </select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="active">Active Requests</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-4">
              {activeRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{request.postedAt}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline" className="font-normal">
                              {request.category}
                            </Badge>
                            <span className="mx-2">•</span>
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{request.status}</Badge>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Button
                            onClick={() => router.push(`/client/requests/${request.id}`)}
                            className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                          >
                            View Bids ({request.bids})
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{request.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-sm font-medium">{request.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Frequency</p>
                            <p className="text-sm font-medium">{request.frequency}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium">{request.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{request.bids}</span> trainers have bid on this
                        request
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            // Handle cancel request
                          }}
                        >
                          Cancel Request
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-700 hover:text-pink-800 hover:bg-pink-50"
                          onClick={() => router.push(`/client/requests/${request.id}/edit`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              {completedRequests.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold">{request.title}</h3>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            <span>{request.postedAt}</span>
                            <span className="mx-2">•</span>
                            <Badge variant="outline" className="font-normal">
                              {request.category}
                            </Badge>
                            <span className="mx-2">•</span>
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{request.status}</Badge>
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                          <div className="flex items-center mr-4">
                            <Avatar className="h-8 w-8 mr-2">
                              <AvatarImage
                                src={request.hiredTrainer.image || "/placeholder.svg"}
                                alt={request.hiredTrainer.name}
                              />
                              <AvatarFallback>
                                {request.hiredTrainer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">{request.hiredTrainer.name}</p>
                              <div className="flex items-center">
                                <Star className="h-3 w-3 text-yellow-500 mr-1" />
                                <span className="text-xs">{request.hiredTrainer.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{request.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <DollarSign className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Budget</p>
                            <p className="text-sm font-medium">{request.budget}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Frequency</p>
                            <p className="text-sm font-medium">{request.frequency}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-gray-500 mr-2" />
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium">{request.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>Completed on {request.postedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => router.push(`/client/orders/${request.id}`)}>
                          View Order
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-700 hover:text-pink-800 hover:bg-pink-50"
                          onClick={() => router.push(`/client/requests/${request.id}`)}
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
