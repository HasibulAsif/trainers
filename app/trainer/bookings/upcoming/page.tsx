import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, MessageSquare, Phone } from "lucide-react"

export default function TrainerUpcomingBookingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Upcoming Sessions</h1>
            <p className="text-gray-600">Manage your scheduled training sessions</p>
          </div>

          <div className="space-y-6">
            <h2 className="text-lg font-medium">Today</h2>
            <div className="space-y-4">
              {[
                {
                  client: "John Doe",
                  type: "Weight Training",
                  time: "10:00 AM",
                  duration: "60 min",
                  location: "Gulshan Fitness Center",
                  status: "Confirmed",
                },
                {
                  client: "Jane Smith",
                  type: "Yoga",
                  time: "2:30 PM",
                  duration: "45 min",
                  location: "Online",
                  status: "Confirmed",
                },
              ].map((booking, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                        <div>
                          <h3 className="font-medium">{booking.client}</h3>
                          <p className="text-sm text-gray-500">{booking.type}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time} ({booking.duration})
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                          {booking.status}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Cancel
                      </Button>
                      <Button size="sm" className="bg-pink-700 hover:bg-pink-800">
                        Start Session
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <h2 className="text-lg font-medium mt-8">Tomorrow</h2>
            <div className="space-y-4">
              {[
                {
                  client: "Mike Johnson",
                  type: "Cardio Training",
                  time: "9:00 AM",
                  duration: "45 min",
                  location: "Banani Sports Complex",
                  status: "Confirmed",
                },
                {
                  client: "Sarah Williams",
                  type: "Nutrition Consultation",
                  time: "11:30 AM",
                  duration: "30 min",
                  location: "Online",
                  status: "Confirmed",
                },
                {
                  client: "Robert Kim",
                  type: "Strength Training",
                  time: "4:00 PM",
                  duration: "60 min",
                  location: "Gulshan Fitness Center",
                  status: "Pending",
                },
              ].map((booking, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center mb-4 md:mb-0">
                        <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                        <div>
                          <h3 className="font-medium">{booking.client}</h3>
                          <p className="text-sm text-gray-500">{booking.type}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center text-gray-600 text-sm">
                          <Calendar className="h-4 w-4 mr-1" />
                          Tomorrow
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <Clock className="h-4 w-4 mr-1" />
                          {booking.time} ({booking.duration})
                        </div>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-4 w-4 mr-1" />
                          {booking.location}
                        </div>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Confirmed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {booking.status}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button size="sm" variant="outline">
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                        Cancel
                      </Button>
                      {booking.status === "Pending" && (
                        <Button size="sm" className="bg-pink-700 hover:bg-pink-800">
                          Confirm
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
