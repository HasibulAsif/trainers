"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { createNutritionPlan } from "@/lib/actions"

interface NutritionPlanCreatorProps {
  clientId: string
  orderId: string
  onSave?: () => void
}

export function NutritionPlanCreator({ clientId, orderId, onSave }: NutritionPlanCreatorProps) {
  const [goals, setGoals] = useState("")
  const [dailyCalories, setDailyCalories] = useState("")
  const [macroSplit, setMacroSplit] = useState("")
  const [dietaryRestrictions, setDietaryRestrictions] = useState("")
  const [supplements, setSupplements] = useState<string[]>([""])
  const [recommendations, setRecommendations] = useState("")
  const [loading, setLoading] = useState(false)

  const addSupplement = () => {
    setSupplements([...supplements, ""])
  }

  const removeSupplement = (index: number) => {
    const newSupplements = [...supplements]
    newSupplements.splice(index, 1)
    setSupplements(newSupplements)
  }

  const updateSupplement = (index: number, value: string) => {
    const newSupplements = [...supplements]
    newSupplements[index] = value
    setSupplements(newSupplements)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const filteredSupplements = supplements.filter((s) => s.trim() !== "")

      await createNutritionPlan({
        clientId,
        orderId,
        goals,
        dailyCalories: Number.parseInt(dailyCalories) || 0,
        macroSplit,
        dietaryRestrictions,
        supplements: filteredSupplements,
        recommendations,
      })

      if (onSave) onSave()
    } catch (error) {
      console.error("Error saving nutrition plan:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 rounded-t-lg">
        <CardTitle className="text-xl font-outfit text-purple-800">Create Nutrition Plan</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="goals" className="text-sm font-medium">
                Nutrition Goals
              </Label>
              <Textarea
                id="goals"
                placeholder="Weight loss, muscle gain, maintenance, etc."
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                className="mt-1 resize-none h-24"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dailyCalories" className="text-sm font-medium">
                  Daily Calories
                </Label>
                <Input
                  id="dailyCalories"
                  type="number"
                  placeholder="e.g. 2000"
                  value={dailyCalories}
                  onChange={(e) => setDailyCalories(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>

              <div>
                <Label htmlFor="macroSplit" className="text-sm font-medium">
                  Macro Split
                </Label>
                <Input
                  id="macroSplit"
                  placeholder="e.g. 40% carbs, 30% protein, 30% fat"
                  value={macroSplit}
                  onChange={(e) => setMacroSplit(e.target.value)}
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="dietaryRestrictions" className="text-sm font-medium">
                Dietary Restrictions
              </Label>
              <Textarea
                id="dietaryRestrictions"
                placeholder="Allergies, intolerances, preferences, etc."
                value={dietaryRestrictions}
                onChange={(e) => setDietaryRestrictions(e.target.value)}
                className="mt-1 resize-none h-20"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Recommended Supplements</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSupplement} className="h-8 px-2 text-xs">
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add
                </Button>
              </div>

              <div className="space-y-2">
                {supplements.map((supplement, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder={`Supplement ${index + 1}`}
                      value={supplement}
                      onChange={(e) => updateSupplement(index, e.target.value)}
                      className="flex-1"
                    />
                    {supplements.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSupplement(index)}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="recommendations" className="text-sm font-medium">
                Additional Recommendations
              </Label>
              <Textarea
                id="recommendations"
                placeholder="Meal timing, hydration, etc."
                value={recommendations}
                onChange={(e) => setRecommendations(e.target.value)}
                className="mt-1 resize-none h-24"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
            disabled={loading}
          >
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Saving..." : "Save Nutrition Plan"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
