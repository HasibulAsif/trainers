"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Calendar, DollarSign, Dumbbell, Utensils, Apple, ChevronRight } from "lucide-react"

interface Order {
  id: string
  trainer: {
    id: string
    name: string
    avatar: string
    specialization: string
  }
  service: string
  plan_type: "basic" | "standard" | "premium"
  status: "active" | "completed" | "cancelled"
  created_at: string
  completed_at?: string
  cancelled_at?: string
  amount: number
  has_nutrition_plan: boolean
  has_meal_plan: boolean
  has_workout_plan: boolean
}

interface OrdersListProps {
  orders: Order[]
}

export default function ClientOrdersList({ orders }: OrdersListProps) {
  const [filter, setFilter] = useState<"all" | "active" | "completed" | "cancelled">("all")

  const filteredOrders = filter === "all" ? orders : orders.filter((order) => order.status === filter)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getPlanTypeColor = (planType: string) => {
    switch (planType) {
      case "basic":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
      case "standard":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      case "premium":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant={filter === "all" ? "default" : "outline"} size="sm" onClick={() => setFilter("all")}>
          All Orders
        </Button>
        <Button
          variant={filter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("active")}
          className={filter === "active" ? "bg-green-600 hover:bg-green-700" : ""}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "bg-blue-600 hover:bg-blue-700" : ""}
        >
          Completed
        </Button>
        <Button
          variant={filter === "cancelled" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("cancelled")}
          className={filter === "cancelled" ? "bg-red-600 hover:bg-red-700" : ""}
        >
          Cancelled
        </Button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No orders found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardContent className="p-0">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={getPlanTypeColor(order.plan_type)}>
                      {order.plan_type.charAt(0).toUpperCase() + order.plan_type.slice(1)}
                    </Badge>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{order.service}</h3>

                  <div className="flex items-center mb-4">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={order.trainer.avatar || "/placeholder.svg"} alt={order.trainer.name} />
                      <AvatarFallback>{order.trainer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{order.trainer.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{order.trainer.specialization}</p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Ordered: {format(new Date(order.created_at), "MMM d, yyyy")}</span>
                    </div>

                    {order.completed_at && (
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>Completed: {format(new Date(order.completed_at), "MMM d, yyyy")}</span>
                      </div>
                    )}

                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <DollarSign className="h-4 w-4 mr-2" />
                      <span>${order.amount}</span>
                    </div>
                  </div>

                  <div className="flex items-center mt-4 space-x-2">
                    {order.has_workout_plan && (
                      <Badge
                        variant="outline"
                        className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                      >
                        <Dumbbell className="h-3 w-3 mr-1" />
                        Workout
                      </Badge>
                    )}

                    {order.has_nutrition_plan && (
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                      >
                        <Apple className="h-3 w-3 mr-1" />
                        Nutrition
                      </Badge>
                    )}

                    {order.has_meal_plan && (
                      <Badge
                        variant="outline"
                        className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                      >
                        <Utensils className="h-3 w-3 mr-1" />
                        Meal
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="bg-gray-50 dark:bg-gray-900 p-4 border-t">
                <Link href={`/client/orders/${order.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Details
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
