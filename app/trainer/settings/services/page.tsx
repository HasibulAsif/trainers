"use client"

import type React from "react"

import { useState } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Plus, Save, Trash2 } from "lucide-react"

export default function TrainerServicesPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Service Plans</h1>
            <p className="text-gray-600">Create and manage your service tiers</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Service Tiers</CardTitle>
              <CardDescription>
                Offer different service tiers to cater to various client needs and budgets
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="basic">Basic Plan</TabsTrigger>
                  <TabsTrigger value="standard">Standard Plan</TabsTrigger>
                  <TabsTrigger value="premium">Premium Plan</TabsTrigger>
                </TabsList>

                <TabsContent value="basic" className="space-y-4">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="basic-name">Plan Name</Label>
                        <Input id="basic-name" defaultValue="Basic Fitness Package" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="basic-price">Price (per month)</Label>
                          <div className="flex items-center">
                            <span className="mr-2">$</span>
                            <Input id="basic-price" type="number" min="0" defaultValue="99" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="basic-sessions">Sessions per month</Label>
                          <Input id="basic-sessions" type="number" min="1" defaultValue="4" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="basic-description">Description</Label>
                        <Textarea
                          id="basic-description"
                          rows={4}
                          defaultValue="Perfect for beginners looking to start their fitness journey. Includes personalized workout plans and basic nutritional guidance."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                          {[
                            "4 training sessions per month",
                            "Basic workout plan",
                            "Monthly progress tracking",
                            "Email support",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox id={`basic-feature-${index}`} defaultChecked />
                              <div className="flex-1">
                                <Input defaultValue={feature} placeholder="Feature description" />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                            <Plus className="h-4 w-4" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                      {isLoading ? (
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
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Basic Plan
                        </>
                      )}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="standard" className="space-y-4">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="standard-name">Plan Name</Label>
                        <Input id="standard-name" defaultValue="Standard Fitness Package" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="standard-price">Price (per month)</Label>
                          <div className="flex items-center">
                            <span className="mr-2">$</span>
                            <Input id="standard-price" type="number" min="0" defaultValue="199" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="standard-sessions">Sessions per month</Label>
                          <Input id="standard-sessions" type="number" min="1" defaultValue="8" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="standard-description">Description</Label>
                        <Textarea
                          id="standard-description"
                          rows={4}
                          defaultValue="Our most popular package. Includes more frequent training sessions, detailed nutrition plans, and regular progress assessments."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                          {[
                            "8 training sessions per month",
                            "Customized workout plan",
                            "Detailed nutrition guidance",
                            "Bi-weekly progress assessments",
                            "Priority email support",
                            "Access to mobile app",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox id={`standard-feature-${index}`} defaultChecked />
                              <div className="flex-1">
                                <Input defaultValue={feature} placeholder="Feature description" />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                            <Plus className="h-4 w-4" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Standard Plan"}
                    </Button>
                  </form>
                </TabsContent>

                <TabsContent value="premium" className="space-y-4">
                  <form onSubmit={handleSave} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="premium-name">Plan Name</Label>
                        <Input id="premium-name" defaultValue="Premium Fitness Package" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="premium-price">Price (per month)</Label>
                          <div className="flex items-center">
                            <span className="mr-2">$</span>
                            <Input id="premium-price" type="number" min="0" defaultValue="349" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="premium-sessions">Sessions per month</Label>
                          <Input id="premium-sessions" type="number" min="1" defaultValue="12" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="premium-description">Description</Label>
                        <Textarea
                          id="premium-description"
                          rows={4}
                          defaultValue="The ultimate fitness experience. Includes frequent training sessions, comprehensive nutrition and meal planning, 24/7 support, and exclusive premium features."
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                          {[
                            "12 training sessions per month",
                            "Fully customized workout program",
                            "Comprehensive nutrition and meal planning",
                            "Weekly progress assessments",
                            "24/7 support via chat",
                            "Video analysis of form and technique",
                            "Personalized supplement recommendations",
                            "Access to premium mobile app features",
                          ].map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Checkbox id={`premium-feature-${index}`} defaultChecked />
                              <div className="flex-1">
                                <Input defaultValue={feature} placeholder="Feature description" />
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Remove</span>
                              </Button>
                            </div>
                          ))}
                          <Button type="button" variant="outline" size="sm" className="flex items-center gap-2 mt-2">
                            <Plus className="h-4 w-4" />
                            Add Feature
                          </Button>
                        </div>
                      </div>
                    </div>

                    <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Premium Plan"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Custom Services</CardTitle>
              <CardDescription>Create additional services you offer outside of your main packages</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSave} className="space-y-6">
                <div className="space-y-4">
                  {[
                    {
                      name: "Single Training Session",
                      price: 75,
                      description: "One-time training session without a monthly commitment.",
                    },
                    {
                      name: "Nutrition Consultation",
                      price: 120,
                      description: "90-minute in-depth nutrition assessment and personalized meal planning.",
                    },
                    {
                      name: "Fitness Assessment",
                      price: 99,
                      description:
                        "Comprehensive fitness evaluation including body composition, strength, flexibility, and cardiovascular health.",
                    },
                  ].map((service, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Service #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`service-name-${index}`}>Service Name</Label>
                          <Input id={`service-name-${index}`} defaultValue={service.name} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`service-price-${index}`}>Price ($)</Label>
                          <Input id={`service-price-${index}`} type="number" min="0" defaultValue={service.price} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`service-desc-${index}`}>Description</Label>
                        <Textarea id={`service-desc-${index}`} rows={2} defaultValue={service.description} />
                      </div>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Custom Service
                  </Button>
                </div>

                <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Custom Services"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
