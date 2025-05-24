"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Dumbbell,
  Utensils,
  Apple,
  MessageSquare,
  FileText,
  ChevronLeft,
  CheckCircle,
  XCircle,
  PenLine,
  Upload,
  Download,
} from "lucide-react"

interface Exercise {
  name: string
  sets: number
  reps: string
  rest: string
}

interface Workout {
  day: string
  focus: string
  exercises: Exercise[]
}

interface Meal {
  day: string
  breakfast: string
  lunch: string
  dinner: string
  snacks: string[]
}

interface Order {
  id: string
  client: {
    id: string
    name: string
    avatar: string
    email: string
    phone: string
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
  description: string
  nutrition_plan?: {
    id: string
    title: string
    description: string
    daily_calories: number
    protein_percentage: number
    carbs_percentage: number
    fat_percentage: number
    notes: string
    created_at: string
  } | null
  meal_plan?: {
    id: string
    title: string
    description: string
    meals: Meal[]
    created_at: string
  } | null
  workout_plan?: {
    id: string
    title: string
    description: string
    frequency: number
    duration_weeks: number
    workouts: Workout[]
    created_at: string
  } | null
}

interface OrderDetailProps {
  order: Order
}

export default function TrainerOrderDetail({ order }: OrderDetailProps) {
  const [activeTab, setActiveTab] = useState("overview")

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Link href="/trainer/orders">
            <Button variant="ghost" size="sm" className="mr-4">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        <Badge className={getStatusColor(order.status)}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="nutrition" disabled={!order.has_nutrition_plan}>
                Nutrition Plan
              </TabsTrigger>
              <TabsTrigger value="meal" disabled={!order.has_meal_plan}>
                Meal Plan
              </TabsTrigger>
              <TabsTrigger value="workout" disabled={!order.has_workout_plan}>
                Workout Plan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>{order.service}</CardTitle>
                  <CardDescription>{order.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Plan Type</span>
                      <Badge className={getPlanTypeColor(order.plan_type)}>
                        {order.plan_type.charAt(0).toUpperCase() + order.plan_type.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Order Date</span>
                      <span>{format(new Date(order.created_at), "MMMM d, yyyy")}</span>
                    </div>

                    {order.completed_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Completed Date</span>
                        <span>{format(new Date(order.completed_at), "MMMM d, yyyy")}</span>
                      </div>
                    )}

                    {order.cancelled_at && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Cancelled Date</span>
                        <span>{format(new Date(order.cancelled_at), "MMMM d, yyyy")}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Amount</span>
                      <span className="font-semibold">${order.amount}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 dark:text-gray-400">Required Plans</span>
                      <div className="flex space-x-2">
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
                  </div>
                </CardContent>
                <CardFooter className="flex flex-wrap gap-3 border-t pt-6">
                  {order.status === "active" && (
                    <>
                      <Button className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Mark as Completed
                      </Button>

                      <Button
                        variant="outline"
                        className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Cancel Order
                      </Button>
                    </>
                  )}

                  <Button variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Invoice
                  </Button>
                </CardFooter>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {order.has_nutrition_plan && (
                  <Card
                    className={
                      !order.nutrition_plan
                        ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800"
                        : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Nutrition Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {order.nutrition_plan ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.nutrition_plan.title}</p>
                      ) : (
                        <p className="text-sm text-amber-700 dark:text-amber-300">Nutrition plan needs to be created</p>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      {order.nutrition_plan ? (
                        <Button variant="outline" size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Create Plan
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}

                {order.has_meal_plan && (
                  <Card
                    className={
                      !order.meal_plan ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800" : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Meal Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {order.meal_plan ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.meal_plan.title}</p>
                      ) : (
                        <p className="text-sm text-amber-700 dark:text-amber-300">Meal plan needs to be created</p>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      {order.meal_plan ? (
                        <Button variant="outline" size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Create Plan
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}

                {order.has_workout_plan && (
                  <Card
                    className={
                      !order.workout_plan ? "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800" : ""
                    }
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Workout Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {order.workout_plan ? (
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.workout_plan.title}</p>
                      ) : (
                        <p className="text-sm text-amber-700 dark:text-amber-300">Workout plan needs to be created</p>
                      )}
                    </CardContent>
                    <CardFooter className="border-t pt-4">
                      {order.workout_plan ? (
                        <Button variant="outline" size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                      ) : (
                        <Button size="sm" className="w-full">
                          <PenLine className="h-4 w-4 mr-2" />
                          Create Plan
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                )}
              </div>
            </TabsContent>

            {order.has_nutrition_plan && (
              <TabsContent value="nutrition" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>
                          {order.nutrition_plan ? order.nutrition_plan.title : "Create Nutrition Plan"}
                        </CardTitle>
                        <CardDescription>
                          {order.nutrition_plan
                            ? order.nutrition_plan.description
                            : "No nutrition plan has been created yet."}
                        </CardDescription>
                      </div>

                      {order.nutrition_plan && (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(order.nutrition_plan.created_at), "MMM d, yyyy")}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {order.nutrition_plan ? (
                    <>
                      <CardContent>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-lg font-medium mb-3">Daily Macronutrients</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <Card className="bg-gray-50 dark:bg-gray-900">
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-gray-500 dark:text-gray-400">Daily Calories</p>
                                  <p className="text-2xl font-bold">{order.nutrition_plan.daily_calories}</p>
                                </CardContent>
                              </Card>

                              <Card className="bg-blue-50 dark:bg-blue-950">
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-blue-700 dark:text-blue-300">Protein</p>
                                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                                    {order.nutrition_plan.protein_percentage}%
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="bg-green-50 dark:bg-green-950">
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-green-700 dark:text-green-300">Carbs</p>
                                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                                    {order.nutrition_plan.carbs_percentage}%
                                  </p>
                                </CardContent>
                              </Card>

                              <Card className="bg-amber-50 dark:bg-amber-950">
                                <CardContent className="p-4 text-center">
                                  <p className="text-sm text-amber-700 dark:text-amber-300">Fat</p>
                                  <p className="text-2xl font-bold text-amber-700 dark:text-amber-300">
                                    {order.nutrition_plan.fat_percentage}%
                                  </p>
                                </CardContent>
                              </Card>
                            </div>
                          </div>

                          <div>
                            <h3 className="text-lg font-medium mb-3">Notes</h3>
                            <Card className="bg-gray-50 dark:bg-gray-900">
                              <CardContent className="p-4">
                                <p className="text-gray-700 dark:text-gray-300">{order.nutrition_plan.notes}</p>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-6">
                        <Button variant="outline">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Plan
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-center mb-6">
                        <Apple className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Nutrition Plan Created Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          Create a personalized nutrition plan for your client to help them achieve their fitness goals.
                        </p>
                      </div>
                      <Button>
                        <PenLine className="h-4 w-4 mr-2" />
                        Create Nutrition Plan
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            )}

            {order.has_meal_plan && (
              <TabsContent value="meal" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{order.meal_plan ? order.meal_plan.title : "Create Meal Plan"}</CardTitle>
                        <CardDescription>
                          {order.meal_plan ? order.meal_plan.description : "No meal plan has been created yet."}
                        </CardDescription>
                      </div>

                      {order.meal_plan && (
                        <Badge
                          variant="outline"
                          className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(order.meal_plan.created_at), "MMM d, yyyy")}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {order.meal_plan ? (
                    <>
                      <CardContent>
                        <div className="space-y-6">
                          {order.meal_plan.meals.map((meal, index) => (
                            <Card key={index} className="bg-gray-50 dark:bg-gray-900">
                              <CardHeader className="pb-2">
                                <CardTitle className="text-lg">{meal.day}</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-4">
                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Breakfast</h4>
                                    <p className="mt-1">{meal.breakfast}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Lunch</h4>
                                    <p className="mt-1">{meal.lunch}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Dinner</h4>
                                    <p className="mt-1">{meal.dinner}</p>
                                  </div>

                                  <div>
                                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Snacks</h4>
                                    <ul className="mt-1 list-disc list-inside">
                                      {meal.snacks.map((snack, snackIndex) => (
                                        <li key={snackIndex}>{snack}</li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-6">
                        <Button variant="outline">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Plan
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-center mb-6">
                        <Utensils className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Meal Plan Created Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          Create a detailed meal plan with daily meals and recipes for your client.
                        </p>
                      </div>
                      <Button>
                        <PenLine className="h-4 w-4 mr-2" />
                        Create Meal Plan
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            )}

            {order.has_workout_plan && (
              <TabsContent value="workout" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>{order.workout_plan ? order.workout_plan.title : "Create Workout Plan"}</CardTitle>
                        <CardDescription>
                          {order.workout_plan
                            ? order.workout_plan.description
                            : "No workout plan has been created yet."}
                        </CardDescription>
                      </div>

                      {order.workout_plan && (
                        <Badge
                          variant="outline"
                          className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800"
                        >
                          <Calendar className="h-3 w-3 mr-1" />
                          {format(new Date(order.workout_plan.created_at), "MMM d, yyyy")}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  {order.workout_plan ? (
                    <>
                      <CardContent>
                        <div className="space-y-4 mb-6">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Frequency</span>
                            <span>{order.workout_plan.frequency} days per week</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                            <span>{order.workout_plan.duration_weeks} weeks</span>
                          </div>
                        </div>

                        <div className="space-y-6">
                          {order.workout_plan.workouts.map((workout, index) => (
                            <Card key={index} className="bg-gray-50 dark:bg-gray-900">
                              <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                  <CardTitle className="text-lg">{workout.day}</CardTitle>
                                  <Badge>{workout.focus}</Badge>
                                </div>
                              </CardHeader>
                              <CardContent>
                                <div className="overflow-x-auto">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="border-b">
                                        <th className="text-left py-2 px-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                          Exercise
                                        </th>
                                        <th className="text-center py-2 px-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                          Sets
                                        </th>
                                        <th className="text-center py-2 px-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                          Reps
                                        </th>
                                        <th className="text-center py-2 px-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                          Rest
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {workout.exercises.map((exercise, exerciseIndex) => (
                                        <tr key={exerciseIndex} className="border-b last:border-0">
                                          <td className="py-3 px-1">{exercise.name}</td>
                                          <td className="py-3 px-1 text-center">{exercise.sets}</td>
                                          <td className="py-3 px-1 text-center">{exercise.reps}</td>
                                          <td className="py-3 px-1 text-center">{exercise.rest}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t pt-6">
                        <Button variant="outline">
                          <PenLine className="h-4 w-4 mr-2" />
                          Edit Plan
                        </Button>
                        <Button variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Download Plan
                        </Button>
                      </CardFooter>
                    </>
                  ) : (
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <div className="text-center mb-6">
                        <Dumbbell className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Workout Plan Created Yet</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          Create a personalized workout plan with exercises, sets, and reps for your client.
                        </p>
                      </div>
                      <Button>
                        <PenLine className="h-4 w-4 mr-2" />
                        Create Workout Plan
                      </Button>
                    </CardContent>
                  )}
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Client Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-6">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage src={order.client.avatar || "/placeholder.svg"} alt={order.client.name} />
                  <AvatarFallback>{order.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-lg">{order.client.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{order.client.email}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email</p>
                  <p>{order.client.email}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone</p>
                  <p>{order.client.phone}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-6 flex flex-col space-y-3">
              <Button className="w-full">
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Client
              </Button>

              <Link href={`/trainer/orders/${order.id}/files`} className="w-full">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  Manage Files
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Order Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.status === "active" && (
                <>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Completed
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Order
                  </Button>
                </>
              )}

              <Button variant="outline" className="w-full">
                <FileText className="h-4 w-4 mr-2" />
                Generate Invoice
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
