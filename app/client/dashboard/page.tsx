import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, DollarSign, Users } from "lucide-react"

export default function ClientDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="client" />
      <div className="flex-1">
        <DashboardHeader userType="client" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Welcome back, John</h1>
            <p className="text-gray-600">Here's what's happening with your fitness journey</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-pink-100 p-3 rounded-full mr-4">
                  <Calendar className="h-6 w-6 text-pink-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Upcoming Sessions</p>
                  <h3 className="text-2xl font-bold">3</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-purple-100 p-3 rounded-full mr-4">
                  <Clock className="h-6 w-6 text-purple-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Hours</p>
                  <h3 className="text-2xl font-bold">24</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-blue-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Favorite Trainers</p>
                  <h3 className="text-2xl font-bold">5</h3>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 flex items-center">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <DollarSign className="h-6 w-6 text-green-700" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Spent</p>
                  <h3 className="text-2xl font-bold">$480</h3>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>Your scheduled training sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                      <div>
                        <h4 className="font-medium">Yoga with Sarah Smith</h4>
                        <p className="text-sm text-gray-500">
                          {new Date(Date.now() + (index + 1) * 24 * 60 * 60 * 1000).toLocaleDateString()} • 10:00 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                        Confirmed
                      </div>
                      <button className="text-sm text-pink-700 hover:underline">Reschedule</button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recommended Trainers */}
          <Card>
            <CardHeader>
              <CardTitle>Recommended Trainers</CardTitle>
              <CardDescription>Based on your preferences and goals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gray-200 mr-3"></div>
                      <div>
                        <h4 className="font-medium">Trainer Name</h4>
                        <p className="text-xs text-gray-500">Fitness Specialist</p>
                      </div>
                    </div>
                    <div className="flex items-center text-yellow-500 mb-3">
                      {[1, 2, 3, 4, 5].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                      <span className="ml-1 text-xs text-gray-500">(48)</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      Specializes in weight training and nutrition planning for beginners.
                    </p>
                    <button className="w-full py-1.5 bg-pink-700 text-white rounded-md text-sm hover:bg-pink-800 transition-colors">
                      View Profile
                    </button>
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
