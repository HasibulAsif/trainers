"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Save, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createMealPlan } from "@/lib/actions"

interface Meal {
  id: string
  name: string
  time: string
  description: string
  calories: string
  protein: string
  carbs: string
  fats: string
}

interface MealPlanCreatorProps {
  clientId: string
  orderId: string
  onSave?: () => void
}

export function MealPlanCreator({ clientId, orderId, onSave }: MealPlanCreatorProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [duration, setDuration] = useState("7") // Default 7 days
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: crypto.randomUUID(),
      name: "Breakfast",
      time: "08:00",
      description: "",
      calories: "",
      protein: "",
      carbs: "",
      fats: "",
    },
  ])
  const [loading, setLoading] = useState(false)

  const addMeal = () => {
    setMeals([
      ...meals,
      {
        id: crypto.randomUUID(),
        name: "",
        time: "",
        description: "",
        calories: "",
        protein: "",
        carbs: "",
        fats: "",
      },
    ])
  }

  const removeMeal = (id: string) => {
    setMeals(meals.filter((meal) => meal.id !== id))
  }

  const updateMeal = (id: string, field: keyof Meal, value: string) => {
    setMeals(meals.map((meal) => (meal.id === id ? { ...meal, [field]: value } : meal)))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createMealPlan({
        clientId,
        orderId,
        title,
        description,
        duration: Number.parseInt(duration),
        meals: meals.map((meal) => ({
          name: meal.name,
          time: meal.time,
          description: meal.description,
          calories: Number.parseInt(meal.calories) || 0,
          protein: Number.parseInt(meal.protein) || 0,
          carbs: Number.parseInt(meal.carbs) || 0,
          fats: Number.parseInt(meal.fats) || 0,
        })),
      })

      if (onSave) onSave()
    } catch (error) {
      console.error("Error saving meal plan:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 rounded-t-lg">
        <CardTitle className="text-xl font-outfit text-purple-800">Create Meal Plan</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">
                Plan Title
              </Label>
              <Input
                id="title"
                placeholder="e.g. Weight Loss Meal Plan"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-medium">
                Plan Description
              </Label>
              <Textarea
                id="description"
                placeholder="Brief description of the meal plan"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 resize-none h-20"
                required
              />
            </div>

            <div>
              <Label htmlFor="duration" className="text-sm font-medium">
                Duration (Days)
              </Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger id="duration" className="mt-1">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 day</SelectItem>
                  <SelectItem value="3">3 days</SelectItem>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="28">28 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Meals</Label>
                <Button type="button" variant="outline" size="sm" onClick={addMeal} className="h-8 px-2 text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Meal
                </Button>
              </div>

              <div className="space-y-6">
                {meals.map((meal) => (
                  <Card key={meal.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center mb-4">
                        <Input
                          placeholder="Meal Name (e.g. Breakfast, Lunch)"
                          value={meal.name}
                          onChange={(e) => updateMeal(meal.id, "name", e.target.value)}
                          className="max-w-[200px]"
                          required
                        />

                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <Input
                            type="time"
                            value={meal.time}
                            onChange={(e) => updateMeal(meal.id, "time", e.target.value)}
                            className="w-24"
                          />

                          {meals.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => removeMeal(meal.id)}
                              className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <div className="mb-4">
                        <Textarea
                          placeholder="Meal description, ingredients, preparation instructions"
                          value={meal.description}
                          onChange={(e) => updateMeal(meal.id, "description", e.target.value)}
                          className="resize-none h-24"
                          required
                        />
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div>
                          <Label className="text-xs">Calories</Label>
                          <Input
                            type="number"
                            placeholder="kcal"
                            value={meal.calories}
                            onChange={(e) => updateMeal(meal.id, "calories", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Protein</Label>
                          <Input
                            type="number"
                            placeholder="g"
                            value={meal.protein}
                            onChange={(e) => updateMeal(meal.id, "protein", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Carbs</Label>
                          <Input
                            type="number"
                            placeholder="g"
                            value={meal.carbs}
                            onChange={(e) => updateMeal(meal.id, "carbs", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Fats</Label>
                          <Input
                            type="number"
                            placeholder="g"
                            value={meal.fats}
                            onChange={(e) => updateMeal(meal.id, "fats", e.target.value)}
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Meal Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
