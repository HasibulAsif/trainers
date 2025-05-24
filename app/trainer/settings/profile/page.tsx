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
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Camera, Plus, Save, Trash2, X } from "lucide-react"

export default function TrainerProfileSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [specializations, setSpecializations] = useState(["Weight Training", "Cardio", "Yoga", "Nutrition"])
  const [certifications, setCertifications] = useState([
    { name: "Certified Personal Trainer", abbreviation: "CPT", organization: "NASM" },
    { name: "Certified Strength and Conditioning Specialist", abbreviation: "CSCS", organization: "NSCA" },
  ])

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  const handleAddSpecialization = () => {
    setSpecializations([...specializations, ""])
  }

  const handleRemoveSpecialization = (index: number) => {
    setSpecializations(specializations.filter((_, i) => i !== index))
  }

  const handleSpecializationChange = (index: number, value: string) => {
    const newSpecializations = [...specializations]
    newSpecializations[index] = value
    setSpecializations(newSpecializations)
  }

  const handleAddCertification = () => {
    setCertifications([...certifications, { name: "", abbreviation: "", organization: "" }])
  }

  const handleRemoveCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index))
  }

  const handleCertificationChange = (index: number, field: string, value: string) => {
    const newCertifications = [...certifications]
    newCertifications[index] = { ...newCertifications[index], [field]: value }
    setCertifications(newCertifications)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="trainer" />
      <div className="flex-1">
        <DashboardHeader userType="trainer" />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Profile Settings</h1>
            <p className="text-gray-600">Manage your trainer profile information</p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information and profile picture</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex flex-col items-center space-y-4">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile" />
                        <AvatarFallback>ST</AvatarFallback>
                      </Avatar>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Camera className="h-4 w-4" />
                        Change Photo
                      </Button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" defaultValue="Sarah" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" defaultValue="Smith" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="title">Professional Title</Label>
                        <Input id="title" defaultValue="Certified Fitness Trainer & Nutrition Specialist" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="sarah.smith@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="+1 (555) 987-6543" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" defaultValue="Los Angeles, CA" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Professional Bio</Label>
                    <Textarea
                      id="bio"
                      rows={6}
                      defaultValue="I'm a certified fitness trainer with over 8 years of experience helping clients achieve their fitness goals. I specialize in weight training, cardio, and nutrition planning. My approach focuses on sustainable lifestyle changes rather than quick fixes."
                    />
                    <p className="text-sm text-gray-500">
                      Write a compelling bio that highlights your expertise, experience, and training philosophy.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        max="50"
                        defaultValue="8"
                        className="w-24 text-right"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Languages</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {["English", "Spanish", "French", "German", "Chinese", "Hindi"].map((language, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox id={`language-${index}`} defaultChecked={index < 2} />
                          <Label htmlFor={`language-${index}`}>{language}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="online-available" defaultChecked />
                      <Label htmlFor="online-available">Available for Online Sessions</Label>
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
                        Save Basic Information
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Specializations</CardTitle>
                <CardDescription>Add your areas of expertise and specialization</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    {specializations.map((specialization, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          value={specialization}
                          onChange={(e) => handleSpecializationChange(index, e.target.value)}
                          placeholder="e.g., Weight Training, Yoga, Nutrition, etc."
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => handleRemoveSpecialization(index)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleAddSpecialization}
                    >
                      <Plus className="h-4 w-4" />
                      Add Specialization
                    </Button>
                  </div>

                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Specializations"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Add your professional certifications and qualifications</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    {certifications.map((certification, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-4">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium">Certification #{index + 1}</h4>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => handleRemoveCertification(index)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`cert-name-${index}`}>Certification Name</Label>
                            <Input
                              id={`cert-name-${index}`}
                              value={certification.name}
                              onChange={(e) => handleCertificationChange(index, "name", e.target.value)}
                              placeholder="e.g., Certified Personal Trainer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-abbr-${index}`}>Abbreviation</Label>
                            <Input
                              id={`cert-abbr-${index}`}
                              value={certification.abbreviation}
                              onChange={(e) => handleCertificationChange(index, "abbreviation", e.target.value)}
                              placeholder="e.g., CPT"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`cert-org-${index}`}>Issuing Organization</Label>
                            <Input
                              id={`cert-org-${index}`}
                              value={certification.organization}
                              onChange={(e) => handleCertificationChange(index, "organization", e.target.value)}
                              placeholder="e.g., NASM, ACE, NSCA"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      onClick={handleAddCertification}
                    >
                      <Plus className="h-4 w-4" />
                      Add Certification
                    </Button>
                  </div>

                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Certifications"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Hourly Rate</CardTitle>
                <CardDescription>Set your hourly rate for training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Label htmlFor="hourly-rate" className="text-lg">
                        $
                      </Label>
                      <Input
                        id="hourly-rate"
                        type="number"
                        min="0"
                        step="5"
                        defaultValue="65"
                        className="w-32 text-lg"
                      />
                      <span className="text-lg">/hour</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Set a competitive rate based on your experience, certifications, and location. The average rate in
                      your area is $50-80/hour.
                    </p>
                  </div>

                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Hourly Rate"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>Add photos showcasing your training sessions and facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div key={item} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={`/placeholder.svg?height=200&width=200&text=Image+${item}`}
                          alt={`Gallery image ${item}`}
                          className="w-full h-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute top-1 right-1 bg-white/80 hover:bg-white text-red-500 hover:text-red-700 rounded-full h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    ))}
                    <div className="aspect-square bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-4 hover:bg-gray-100 cursor-pointer">
                      <Plus className="h-8 w-8 text-gray-400 mb-2" />
                      <span className="text-sm text-gray-500">Add Photo</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">
                    Upload high-quality photos that showcase your training style and environment. Maximum 8 photos
                    allowed.
                  </p>

                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Gallery"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Availability</CardTitle>
                <CardDescription>Set your weekly availability for training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="space-y-4">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(
                      (day, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <Switch id={`day-${index}`} defaultChecked={index < 5} />
                              <Label htmlFor={`day-${index}`} className="font-medium">
                                {day}
                              </Label>
                            </div>
                            {index < 5 && <span className="text-sm text-green-600 font-medium">Available</span>}
                            {index >= 5 && <span className="text-sm text-gray-500 font-medium">Unavailable</span>}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`start-time-${index}`}>Start Time</Label>
                              <Select defaultValue={index < 5 ? "09:00" : ""} disabled={index >= 5}>
                                <SelectTrigger id={`start-time-${index}`}>
                                  <SelectValue placeholder="Select start time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "06:00",
                                    "07:00",
                                    "08:00",
                                    "09:00",
                                    "10:00",
                                    "11:00",
                                    "12:00",
                                    "13:00",
                                    "14:00",
                                    "15:00",
                                    "16:00",
                                    "17:00",
                                  ].map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`end-time-${index}`}>End Time</Label>
                              <Select defaultValue={index < 5 ? "17:00" : ""} disabled={index >= 5}>
                                <SelectTrigger id={`end-time-${index}`}>
                                  <SelectValue placeholder="Select end time" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[
                                    "12:00",
                                    "13:00",
                                    "14:00",
                                    "15:00",
                                    "16:00",
                                    "17:00",
                                    "18:00",
                                    "19:00",
                                    "20:00",
                                    "21:00",
                                    "22:00",
                                  ].map((time) => (
                                    <SelectItem key={time} value={time}>
                                      {time}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Availability"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
