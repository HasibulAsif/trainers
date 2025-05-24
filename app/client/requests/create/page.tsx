"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, HelpCircle } from "lucide-react"

export default function CreateRequestPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      router.push("/client/requests")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="client" />
      <div className="flex-1">
        <DashboardHeader userType="client" />
        <main className="p-6">
          <div className="mb-6 flex items-center">
            <Button variant="ghost" size="icon" className="mr-2" onClick={() => router.push("/client/requests")}>
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create Training Request</h1>
              <p className="text-gray-600">Post your training needs and receive bids from qualified trainers</p>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
              <CardDescription>
                Provide details about your training needs to help trainers understand what you're looking for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Request Title</Label>
                    <Input id="title" placeholder="e.g., Looking for a Weight Loss Specialist" required />
                    <p className="text-sm text-gray-500">
                      Create a clear, specific title that describes what you're looking for
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Training Category</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weight-loss">Weight Loss</SelectItem>
                        <SelectItem value="strength-training">Strength Training</SelectItem>
                        <SelectItem value="yoga">Yoga</SelectItem>
                        <SelectItem value="pilates">Pilates</SelectItem>
                        <SelectItem value="cardio">Cardio</SelectItem>
                        <SelectItem value="nutrition">Nutrition</SelectItem>
                        <SelectItem value="senior-fitness">Senior Fitness</SelectItem>
                        <SelectItem value="post-natal">Post-natal Fitness</SelectItem>
                        <SelectItem value="sports-specific">Sports-specific Training</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Detailed Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your fitness goals, any specific requirements, and what you're looking for in a trainer..."
                      rows={5}
                      required
                    />
                    <p className="text-sm text-gray-500">
                      The more details you provide, the better trainers can understand your needs
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (per hour)</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="min-budget" className="text-sm text-gray-500">
                            Minimum ($)
                          </Label>
                          <Input id="min-budget" type="number" min="0" placeholder="e.g., 40" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="max-budget" className="text-sm text-gray-500">
                            Maximum ($)
                          </Label>
                          <Input id="max-budget" type="number" min="0" placeholder="e.g., 80" required />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Session Type</Label>
                      <RadioGroup defaultValue="both">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person">In-person only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="online" id="online" />
                          <Label htmlFor="online">Online only</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="both" id="both" />
                          <Label htmlFor="both">Both in-person and online</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="frequency">Training Frequency</Label>
                      <Select required>
                        <SelectTrigger id="frequency">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="once-week">Once a week</SelectItem>
                          <SelectItem value="twice-week">Twice a week</SelectItem>
                          <SelectItem value="three-week">Three times a week</SelectItem>
                          <SelectItem value="four-week">Four times a week</SelectItem>
                          <SelectItem value="five-week">Five times a week</SelectItem>
                          <SelectItem value="custom">Custom schedule</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">Session Duration</Label>
                      <Select required>
                        <SelectTrigger id="duration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="custom">Custom duration</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Trainer Qualifications</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Certified Personal Trainer (CPT)",
                        "Strength and Conditioning Specialist (CSCS)",
                        "Yoga Instructor",
                        "Nutrition Specialist",
                        "Post-natal Fitness Specialist",
                        "Senior Fitness Specialist",
                        "Experience with injury rehabilitation",
                        "Experience with weight loss",
                      ].map((qualification, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`qualification-${index}`} />
                          <Label htmlFor={`qualification-${index}`} className="text-sm">
                            {qualification}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Your Location</Label>
                    <Input id="location" placeholder="e.g., New York, NY" required />
                    <p className="text-sm text-gray-500">
                      This helps us find trainers in your area for in-person sessions
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label>Additional Requirements</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {[
                        "Trainer must have their own equipment",
                        "Willing to train at my home",
                        "Willing to train at a local park",
                        "Willing to train at a gym",
                        "Flexible scheduling",
                        "Weekend availability required",
                      ].map((requirement, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`requirement-${index}`} />
                          <Label htmlFor={`requirement-${index}`} className="text-sm">
                            {requirement}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex gap-4">
                  <div className="flex-shrink-0">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-blue-700 mb-1">What happens next?</h4>
                    <p className="text-sm text-blue-600">
                      After posting your request, qualified trainers will submit bids with their rates and
                      qualifications. You can review these bids, message trainers, and select the best match for your
                      needs.
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-4">
                  <Button type="button" variant="outline" onClick={() => router.push("/client/requests")}>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Posting Request...
                      </>
                    ) : (
                      "Post Training Request"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
