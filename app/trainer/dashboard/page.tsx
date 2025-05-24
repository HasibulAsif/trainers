import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"

export default function TrainerDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, Sarah</h1>
            <p className="text-gray-600">Here's what's happening with your training business</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-pink-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Today's Sessions</p>
                  <h3 className="text-2xl font-bold">4</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">This Week</p>
                  <h3 className="text-2xl font-bold">18</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Active Clients</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">This Month</p>
                  <h3 className="text-2xl font-bold">$1,840</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Today's Schedule */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your upcoming sessions for today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { time: "08:00 AM", client: "John Doe", type: "Weight Training" },
                  { time: "10:30 AM", client: "Jane Smith", type: "Yoga" },
                  { time: "02:00 PM", client: "Mike Johnson", type: "Cardio" },
                  { time: "05:30 PM", client: "Sarah Williams", type: "Nutrition Consultation" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                      <div>
                        <h4 className="font-medium">{session.client}</h4>
                        <p className="text-sm text-gray-500">
                          {session.time} • {session.type}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Confirmed
                      </div>
                      <button className="text-sm text-pink-700 hover:underline">Details</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Latest communications from your clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { client: "John Doe", message: "Hi Sarah, I need to reschedule our session tomorrow." },
                  { client: "Emily Chen", message: "Thanks for the workout plan! I'm already feeling stronger." },
                  { client: "Robert Kim", message: "Can we discuss nutrition options in our next session?" },
                ].map((message, index) => (
                  <div key={index} className="flex items-start p-4 border rounded-lg">
                    <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                    <div>
                      <h4 className="font-medium">{message.client}</h4>
                      <p className="text-sm text-gray-600 mt-1">{message.message}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(Date.now() - index * 3600000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
