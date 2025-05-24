import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, getMockUserData, DEV_MODE } from "@/lib/auth-bypass"
import ClientOrdersList from "./orders-list"

export default async function ClientOrdersPage() {
  // Get orders data
  let orders = []
  let error = null

  try {
    if (DEV_MODE) {
      // Use mock data in development mode
      orders = [
        {
          id: "order-1",
          trainer: {
            id: "trainer-1",
            name: "Sarah Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Fitness Training",
          },
          service: "Custom Workout Plan",
          plan_type: "premium",
          status: "active",
          created_at: "2023-11-15T10:30:00Z",
          amount: 120,
          has_nutrition_plan: true,
          has_meal_plan: true,
          has_workout_plan: true,
        },
        {
          id: "order-2",
          trainer: {
            id: "trainer-2",
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Nutrition Specialist",
          },
          service: "Nutrition Consultation",
          plan_type: "standard",
          status: "completed",
          created_at: "2023-10-20T14:15:00Z",
          completed_at: "2023-11-05T09:45:00Z",
          amount: 85,
          has_nutrition_plan: true,
          has_meal_plan: false,
          has_workout_plan: false,
        },
        {
          id: "order-3",
          trainer: {
            id: "trainer-3",
            name: "Emily Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Yoga Instructor",
          },
          service: "Yoga Program",
          plan_type: "basic",
          status: "cancelled",
          created_at: "2023-09-05T11:20:00Z",
          cancelled_at: "2023-09-07T16:30:00Z",
          amount: 60,
          has_nutrition_plan: false,
          has_meal_plan: false,
          has_workout_plan: true,
        },
      ]
    } else {
      // In production, fetch real data from Supabase
      const supabase = createClient()
      const userRole = getCurrentUserRole()
      const userData = getMockUserData(userRole)

      if (!userData) throw new Error("User not authenticated")

      const { data, error: fetchError } = await supabase
        .from("orders")
        .select(`
          id,
          service,
          plan_type,
          status,
          created_at,
          completed_at,
          cancelled_at,
          amount,
          has_nutrition_plan,
          has_meal_plan,
          has_workout_plan,
          trainers (
            id,
            name,
            avatar_url,
            specialization
          )
        `)
        .eq("client_id", userData.id)
        .order("created_at", { ascending: false })

      if (fetchError) throw fetchError
      orders = data || []
    }
  } catch (err) {
    console.error("Error fetching orders:", err)
    error = "Failed to load orders. Please try again later."
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : (
        <Suspense fallback={<div>Loading orders...</div>}>
          <ClientOrdersList orders={orders} />
        </Suspense>
      )}
    </div>
  )
}
