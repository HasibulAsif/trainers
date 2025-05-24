"use client"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, DollarSign, Filter, MapPin, Search, Send, User } from "lucide-react"

export default function TrainerRequestsPage() {
  const [activeTab, setActiveTab] = useState("available")
  const [selectedRequest, setSelectedRequest] = useState<any>(null)
  const [bidAmount, setBidAmount] = useState("")
  const [bidMessage, setBidMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bidDialogOpen, setBidDialogOpen] = useState(false)

  // Mock data for client requests
  const availableRequests = [
    {
      id: "req-001",
      title: "Looking for a Weight Loss Specialist",
      client: {
        name: "Emily Johnson",
        location: "New York, NY",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Weight Loss",
      description:
        "I'm looking for a trainer to help me lose 20 pounds in the next 3 months. I prefer someone who specializes in nutrition and cardio workouts.",
      budget: "$50-70/hour",
      sessionType: "In-person",
      frequency: "2-3 times per week",
      postedAt: "2 hours ago",
      bids: 3,
    },
    {
      id: "req-002",
      title: "Yoga Instructor for Beginners",
      client: {
        name: "Michael Chen",
        location: "San Francisco, CA",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Yoga",
      description:
        "Complete beginner looking to start yoga practice. Need someone patient who can teach the basics and help with flexibility.",
      budget: "$40-60/hour",
      sessionType: "Online",
      frequency: "Once a week",
      postedAt: "5 hours ago",
      bids: 7,
    },
    {
      id: "req-003",
      title: "Strength Training Coach",
      client: {
        name: "Sarah Williams",
        location: "Chicago, IL",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Strength Training",
      description:
        "Looking for a trainer to help me build muscle and improve overall strength. I have some experience with weightlifting but need guidance on proper form and programming.",
      budget: "$60-80/hour",
      sessionType: "In-person",
      frequency: "3 times per week",
      postedAt: "1 day ago",
      bids: 5,
    },
    {
      id: "req-004",
      title: "Nutrition Coach for Athletic Performance",
      client: {
        name: "David Rodriguez",
        location: "Miami, FL",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Nutrition",
      description:
        "Amateur athlete looking for nutrition guidance to improve performance. Need help with meal planning and timing around workouts.",
      budget: "$70-90/hour",
      sessionType: "Online",
      frequency: "Bi-weekly sessions",
      postedAt: "2 days ago",
      bids: 2,
    },
  ]

  const myBidsRequests = [
    {
      id: "req-005",
      title: "Post-pregnancy Fitness Plan",
      client: {
        name: "Jennifer Lopez",
        location: "Los Angeles, CA",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Post-natal Fitness",
      description:
        "New mom looking to get back in shape safely after pregnancy. Need a trainer experienced with post-natal exercise.",
      budget: "$60-80/hour",
      sessionType: "In-person",
      frequency: "2 times per week",
      postedAt: "3 days ago",
      bids: 4,
      myBid: {
        amount: "$75",
        status: "Pending",
        submittedAt: "2 days ago",
      },
    },
    {
      id: "req-006",
      title: "Senior Fitness Training",
      client: {
        name: "Robert Johnson",
        location: "Phoenix, AZ",
        image: "/placeholder.svg?height=40&width=40",
      },
      category: "Senior Fitness",
      description:
        "65-year-old looking for a trainer who specializes in senior fitness. Need low-impact exercises to improve mobility and strength.",
      budget: "$50-70/hour",
      sessionType: "In-person",
      frequency: "2 times per week",
      postedAt: "4 days ago",
      bids: 6,
      myBid: {
        amount: "$65",
        status: "Accepted",
        submittedAt: "3 days ago",
      },
    },
  ]

  const handleBidSubmit = () => {
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setBidDialogOpen(false)
      // Reset form
      setBidAmount("")
      setBidMessage("")
      // Show success message or redirect
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Client Requests</h1>
            <p className="text-gray-600">Browse and bid on client training requests</p>
          </div>

          <div className="mb-6 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search requests..." className="pl-10" />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
              <select className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="budget_high">Highest Budget</option>
                <option value="budget_low">Lowest Budget</option>
                <option value="least_bids">Least Bids</option>
              </select>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Available Requests</TabsTrigger>
              <TabsTrigger value="my-bids">My Bids</TabsTrigger>
            </TabsList>

            <TabsContent value="available" className="space-y-4">
              {availableRequests.map((request) => (
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
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0">
                          <Dialog
                            open={bidDialogOpen && selectedRequest?.id === request.id}
                            onOpenChange={(open) => {
                              setBidDialogOpen(open)
                              if (open) setSelectedRequest(request)
                            }}
                          >
                            <DialogTrigger asChild>
                              <Button className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600">
                                Submit Bid
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[500px]">
                              <DialogHeader>
                                <DialogTitle>Submit Your Bid</DialogTitle>
                                <DialogDescription>
                                  Provide your rate and a message to the client explaining why you're a good fit for
                                  their needs.
                                </DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium">{selectedRequest?.title}</h4>
                                  <p className="text-sm text-gray-500">Client's budget: {selectedRequest?.budget}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <label htmlFor="bid-amount" className="text-sm font-medium">
                                      Your Rate (per hour)
                                    </label>
                                    <div className="relative">
                                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        $
                                      </span>
                                      <Input
                                        id="bid-amount"
                                        placeholder="e.g. 65"
                                        className="pl-7"
                                        value={bidAmount}
                                        onChange={(e) => setBidAmount(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label htmlFor="session-type" className="text-sm font-medium">
                                      Session Type
                                    </label>
                                    <select
                                      id="session-type"
                                      className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                    >
                                      <option value="in-person">In-person</option>
                                      <option value="online">Online</option>
                                      <option value="both">Both</option>
                                    </select>
                                  </div>
                                </div>
                                <div className="space-y-2">
                                  <label htmlFor="bid-message" className="text-sm font-medium">
                                    Message to Client
                                  </label>
                                  <Textarea
                                    id="bid-message"
                                    placeholder="Introduce yourself and explain why you're a good fit for this client's needs..."
                                    rows={5}
                                    value={bidMessage}
                                    onChange={(e) => setBidMessage(e.target.value)}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setBidDialogOpen(false)}>
                                  Cancel
                                </Button>
                                <Button
                                  onClick={handleBidSubmit}
                                  disabled={!bidAmount || !bidMessage || isSubmitting}
                                  className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                                >
                                  {isSubmitting ? (
                                    <>
                                      <svg
                                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                      >
                                        <circle
                                          className="opacity-25"
                                          cx="12"
                                          cy="12"
                                          r="10"
                                          stroke="currentColor"
                                          strokeWidth="4"
                                        ></circle>
                                        <path
                                          className="opacity-75"
                                          fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                      </svg>
                                      Submitting...
                                    </>
                                  ) : (
                                    "Submit Bid"
                                  )}
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={request.client.image || "/placeholder.svg"}
                              alt={request.client.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <div className="flex items-center text-sm">
                              <User className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              <span>{request.client.name}</span>
                            </div>
                            <div className="hidden md:block text-gray-400">•</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>{request.client.location}</span>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-gray-500 mr-2"
                              >
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                <line x1="14" y1="1" x2="14" y2="4"></line>
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Session Type</p>
                                <p className="text-sm font-medium">{request.sessionType}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span className="font-medium text-gray-900">{request.bids}</span> trainers have bid on this
                        request
                      </div>
                      <Button variant="ghost" size="sm" className="text-pink-700 hover:text-pink-800 hover:bg-pink-50">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="my-bids" className="space-y-4">
              {myBidsRequests.map((request) => (
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
                          </div>
                        </div>
                        <div className="mt-4 md:mt-0 flex items-center">
                          <div className="mr-4">
                            <p className="text-xs text-gray-500">Your Bid</p>
                            <p className="font-medium">{request.myBid.amount}/hour</p>
                          </div>
                          <Badge
                            className={
                              request.myBid.status === "Accepted"
                                ? "bg-green-100 text-green-800 hover:bg-green-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                            }
                          >
                            {request.myBid.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={request.client.image || "/placeholder.svg"}
                              alt={request.client.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                            <div className="flex items-center text-sm">
                              <User className="h-3.5 w-3.5 mr-1 text-gray-500" />
                              <span>{request.client.name}</span>
                            </div>
                            <div className="hidden md:block text-gray-400">•</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              <span>{request.client.location}</span>
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
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-gray-500 mr-2"
                              >
                                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                                <line x1="6" y1="1" x2="6" y2="4"></line>
                                <line x1="10" y1="1" x2="10" y2="4"></line>
                                <line x1="14" y1="1" x2="14" y2="4"></line>
                              </svg>
                              <div>
                                <p className="text-xs text-gray-500">Session Type</p>
                                <p className="text-sm font-medium">{request.sessionType}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        <span>Bid submitted {request.myBid.submittedAt}</span>
                      </div>
                      <div className="flex gap-2">
                        {request.myBid.status === "Pending" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            Withdraw Bid
                          </Button>
                        )}
                        {request.myBid.status === "Accepted" && (
                          <Button
                            size="sm"
                            className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                          >
                            <Send className="h-3.5 w-3.5 mr-1.5" />
                            Message Client
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-pink-700 hover:text-pink-800 hover:bg-pink-50"
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
