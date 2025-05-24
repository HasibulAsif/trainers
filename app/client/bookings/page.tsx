import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin } from "lucide-react"

export default function ClientBookingsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="client" />
      <div className="flex-1">
        <DashboardHeader userType="client" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My Bookings</h1>
            <p className="text-gray-600">Manage your training sessions</p>
          </div>

          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="space-y-4">
                {[
                  {
                    trainer: "Sarah Smith",
                    type: "Yoga Session",
                    date: "Tomorrow",
                    time: "10:00 AM",
                    location: "Online",
                    status: "Confirmed",
                  },
                  {
                    trainer: "Mike Johnson",
                    type: "Weight Training",
                    date: "May 10, 2023",
                    time: "2:30 PM",
                    location: "Gulshan Fitness Center",
                    status: "Pending",
                  },
                  {
                    trainer: "Emily Chen",
                    type: "Nutrition Consultation",
                    date: "May 15, 2023",
                    time: "11:00 AM",
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
                            <h3 className="font-medium">{booking.trainer}</h3>
                            <p className="text-sm text-gray-500">{booking.type}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
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
                          Reschedule
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                          Cancel
                        </Button>
                        <Button size="sm" className="bg-pink-700 hover:bg-pink-800">
                          Join Session
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="space-y-4">
                {[
                  {
                    trainer: "Sarah Smith",
                    type: "Yoga Session",
                    date: "April 28, 2023",
                    time: "10:00 AM",
                    location: "Online",
                    status: "Completed",
                  },
                  {
                    trainer: "Mike Johnson",
                    type: "Weight Training",
                    date: "April 20, 2023",
                    time: "2:30 PM",
                    location: "Gulshan Fitness Center",
                    status: "Completed",
                  },
                ].map((booking, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                          <div>
                            <h3 className="font-medium">{booking.trainer}</h3>
                            <p className="text-sm text-gray-500">{booking.type}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </div>
                          <div className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {booking.status}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                        <Button size="sm" className="bg-pink-700 hover:bg-pink-800">
                          Leave Review
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="cancelled">
              <div className="space-y-4">
                {[
                  {
                    trainer: "Robert Kim",
                    type: "Cardio Training",
                    date: "April 15, 2023",
                    time: "4:00 PM",
                    location: "Banani Sports Complex",
                    status: "Cancelled by you",
                  },
                ].map((booking, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center mb-4 md:mb-0">
                          <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                          <div>
                            <h3 className="font-medium">{booking.trainer}</h3>
                            <p className="text-sm text-gray-500">{booking.type}</p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 items-center">
                          <div className="flex items-center text-gray-600 text-sm">
                            <Calendar className="h-4 w-4 mr-1" />
                            {booking.date}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            {booking.time}
                          </div>
                          <div className="flex items-center text-gray-600 text-sm">
                            <MapPin className="h-4 w-4 mr-1" />
                            {booking.location}
                          </div>
                          <div className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                            {booking.status}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Button size="sm" variant="outline">
                          Book Again
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
