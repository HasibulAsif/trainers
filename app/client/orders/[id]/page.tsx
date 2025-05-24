import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { getCurrentUserRole, getMockUserData, DEV_MODE } from "@/lib/auth-bypass"
import OrderDetail from "./order-detail"

export default async function OrderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  // Get order data
  let order = null
  let error = null

  try {
    if (DEV_MODE) {
      // Use mock data in development mode
      const mockOrders = {
        "order-1": {
          id: "order-1",
          trainer: {
            id: "trainer-1",
            name: "Sarah Smith",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Fitness Training",
            email: "sarah@example.com",
            phone: "+1234567890",
          },
          service: "Custom Workout Plan",
          plan_type: "premium",
          status: "active",
          created_at: "2023-11-15T10:30:00Z",
          amount: 120,
          has_nutrition_plan: true,
          has_meal_plan: true,
          has_workout_plan: true,
          description:
            "Comprehensive fitness program including custom workout routines, nutrition guidance, and meal planning.",
          nutrition_plan: {
            id: "nutrition-1",
            title: "High Protein Nutrition Plan",
            description: "A nutrition plan focused on high protein intake to support muscle growth and recovery.",
            daily_calories: 2500,
            protein_percentage: 40,
            carbs_percentage: 30,
            fat_percentage: 30,
            notes: "Focus on lean proteins and complex carbohydrates. Limit processed foods and sugars.",
            created_at: "2023-11-16T09:15:00Z",
          },
          meal_plan: {
            id: "meal-1",
            title: "Weekly Meal Schedule",
            description: "Detailed meal plan with recipes and shopping list.",
            meals: [
              {
                day: "Monday",
                breakfast: "Protein oatmeal with berries",
                lunch: "Grilled chicken salad with quinoa",
                dinner: "Baked salmon with sweet potato and vegetables",
                snacks: ["Greek yogurt with honey", "Protein shake"],
              },
              {
                day: "Tuesday",
                breakfast: "Egg white omelet with vegetables",
                lunch: "Turkey and avocado wrap",
                dinner: "Lean beef stir fry with brown rice",
                snacks: ["Apple with almond butter", "Cottage cheese"],
              },
            ],
            created_at: "2023-11-16T10:30:00Z",
          },
          workout_plan: {
            id: "workout-1",
            title: "Progressive Strength Training",
            description: "A 12-week progressive strength training program.",
            frequency: 5,
            duration_weeks: 12,
            workouts: [
              {
                day: "Monday",
                focus: "Chest and Triceps",
                exercises: [
                  { name: "Bench Press", sets: 4, reps: "8-10", rest: "90 sec" },
                  { name: "Incline Dumbbell Press", sets: 3, reps: "10-12", rest: "60 sec" },
                  { name: "Tricep Dips", sets: 3, reps: "12-15", rest: "60 sec" },
                  { name: "Cable Flyes", sets: 3, reps: "12-15", rest: "60 sec" },
                ],
              },
              {
                day: "Wednesday",
                focus: "Back and Biceps",
                exercises: [
                  { name: "Pull-ups", sets: 4, reps: "8-10", rest: "90 sec" },
                  { name: "Bent Over Rows", sets: 3, reps: "10-12", rest: "60 sec" },
                  { name: "Bicep Curls", sets: 3, reps: "12-15", rest: "60 sec" },
                  { name: "Lat Pulldowns", sets: 3, reps: "12-15", rest: "60 sec" },
                ],
              },
            ],
            created_at: "2023-11-16T11:45:00Z",
          },
        },
        "order-2": {
          id: "order-2",
          trainer: {
            id: "trainer-2",
            name: "Mike Johnson",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Nutrition Specialist",
            email: "mike@example.com",
            phone: "+1987654321",
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
          description: "Personalized nutrition consultation with dietary analysis and recommendations.",
          nutrition_plan: {
            id: "nutrition-2",
            title: "Weight Management Nutrition Plan",
            description: "A balanced nutrition plan designed for healthy weight management.",
            daily_calories: 2000,
            protein_percentage: 30,
            carbs_percentage: 40,
            fat_percentage: 30,
            notes:
              "Focus on portion control and balanced macronutrients. Include plenty of vegetables and whole foods.",
            created_at: "2023-10-22T13:20:00Z",
          },
        },
        "order-3": {
          id: "order-3",
          trainer: {
            id: "trainer-3",
            name: "Emily Chen",
            avatar: "/placeholder.svg?height=40&width=40",
            specialization: "Yoga Instructor",
            email: "emily@example.com",
            phone: "+1122334455",
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
          description: "Beginner-friendly yoga program with weekly routines.",
          workout_plan: {
            id: "workout-3",
            title: "Beginner Yoga Flow",
            description: "A gentle introduction to yoga practice for beginners.",
            frequency: 3,
            duration_weeks: 8,
            workouts: [
              {
                day: "Monday",
                focus: "Flexibility",
                exercises: [
                  { name: "Sun Salutation", sets: 3, reps: "5 flows", rest: "30 sec" },
                  { name: "Downward Dog", sets: 1, reps: "60 sec hold", rest: "30 sec" },
                  { name: "Warrior Poses", sets: 1, reps: "45 sec each side", rest: "30 sec" },
                ],
              },
              {
                day: "Thursday",
                focus: "Balance",
                exercises: [
                  { name: "Tree Pose", sets: 1, reps: "60 sec each side", rest: "30 sec" },
                  { name: "Chair Pose", sets: 3, reps: "30 sec hold", rest: "30 sec" },
                  { name: "Eagle Pose", sets: 1, reps: "30 sec each side", rest: "30 sec" },
                ],
              },
            ],
            created_at: "2023-09-06T10:15:00Z",
          },
        },
      }

      order = mockOrders[id]
      if (!order) {
        return notFound()
      }
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
          description,
          trainers (
            id,
            name,
            avatar_url,
            specialization,
            email,
            phone
          ),
          nutrition_plans (
            id,
            title,
            description,
            daily_calories,
            protein_percentage,
            carbs_percentage,
            fat_percentage,
            notes,
            created_at
          ),
          meal_plans (
            id,
            title,
            description,
            meals,
            created_at
          ),
          workout_plans (
            id,
            title,
            description,
            frequency,
            duration_weeks,
            workouts,
            created_at
          )
        `)
        .eq("id", id)
        .eq("client_id", userData.id)
        .single()

      if (fetchError) throw fetchError
      order = data
    }
  } catch (err) {
    console.error("Error fetching order details:", err)
    error = "Failed to load order details. Please try again later."
  }

  if (!order) {
    return notFound()
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {error ? <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div> : <OrderDetail order={order} />}
    </div>
  )
}
