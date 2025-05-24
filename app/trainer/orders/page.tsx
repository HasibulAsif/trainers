import { Suspense } from "react"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, getMockUserData, DEV_MODE } from "@/lib/auth-bypass"
import TrainerOrdersList from "./trainer-orders-list"

export default async function TrainerOrdersPage() {
  // Get orders data
  let orders = []
  let error = null

  try {
    if (DEV_MODE) {
      // Use mock data in development mode
      orders = [
        {
          id: "order-1",
          client: {
            id: "client-1",
            name: "John Doe",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "john@example.com",
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
          client: {
            id: "client-2",
            name: "Alice Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "alice@example.com",
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
          client: {
            id: "client-3",
            name: "Robert Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "robert@example.com",
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
        {
          id: "order-4",
          client: {
            id: "client-4",
            name: "Emma Wilson",
            avatar: "/placeholder.svg?height=40&width=40",
            email: "emma@example.com",
          },
          service: "Full Fitness Package",
          plan_type: "premium",
          status: "active",
          created_at: "2023-11-10T09:15:00Z",
          amount: 150,
          has_nutrition_plan: true,
          has_meal_plan: true,
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
          clients (
            id,
            name,
            avatar_url,
            email
          )
        `)
        .eq("trainer_id", userData.id)
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
      <h1 className="text-2xl font-bold mb-6">Client Orders</h1>

      {error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      ) : (
        <Suspense fallback={<div>Loading orders...</div>}>
          <TrainerOrdersList orders={orders} />
        </Suspense>
      )}
    </div>
  )
}
