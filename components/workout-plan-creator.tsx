"use client"

import type React from "react"

import { useState } from "react"
import { Plus, Trash2, Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createWorkoutPlan } from "@/lib/actions"

interface Exercise {
  id: string
  name: string
  sets: string
  reps: string
  rest: string
  notes: string
}

interface Workout {
  id: string
  day: string
  name: string
  description: string
  exercises: Exercise[]
}

interface WorkoutPlanCreatorProps {
  clientId: string
  orderId: string
  onSave?: () => void
}

export function WorkoutPlanCreator({ clientId, orderId, onSave }: WorkoutPlanCreatorProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState('4') // Default 4 weeks
  const [frequency, setFrequency] = useState('3') // Default 3 days per week
  const [workouts, setWorkouts] = useState<Workout[]>([
    {
      id: crypto.randomUUID(),
      day: 'Monday',
      name: 'Upper Body',
      description: '',
      exercises: [
        {
          id: crypto.randomUUID(),
          name: '',
          sets: '',
          reps: '',
          rest: '',
          notes: ''
        }
      ]
    }
  ])
  const [loading, setLoading] = useState(false)

  const addWorkout = () => {
    setWorkouts([
      ...workouts,
      {
        id: crypto.randomUUID(),
        day: '',
        name: '',
        description: '',
        exercises: [
          {
            id: crypto.randomUUID(),
            name: '',
            sets: '',
            reps: '',
            rest: '',
            notes: ''
          }
        ]
      }
    ])
  }

  const removeWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id))
  }

  const updateWorkout = (id: string, field: keyof Workout, value: string) => {
    setWorkouts(workouts.map(workout => 
      workout.id === id ? { ...workout, [field]: value } : workout
    ))
  }

  const addExercise = (workoutId: string) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: [
            ...workout.exercises,
            {
              id: crypto.randomUUID(),
              name: '',
              sets: '',
              reps: '',
              rest: '',
              notes: ''
            }
          ]
        }
      }
      return workout
    }))
  }

  const removeExercise = (workoutId: string, exerciseId: string) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: workout.exercises.filter(exercise => exercise.id !== exerciseId)
        }
      }
      return workout
    }))
  }

  const updateExercise = (workoutId: string, exerciseId: string, field: keyof Exercise, value: string) => {
    setWorkouts(workouts.map(workout => {
      if (workout.id === workoutId) {
        return {
          ...workout,
          exercises: workout.exercises.map(exercise => 
            exercise.id === exerciseId ? { ...exercise, [field]: value } : exercise
          )
        }
      }
      return workout
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      await createWorkoutPlan({
        clientId,
        orderId,
        title,
        description,
        duration: Number.parseInt(duration),
        frequency: Number.parseInt(frequency),
        workouts: workouts.map(workout => ({
          day: workout.day,
          name: workout.name,
          description: workout.description,
          exercises: workout.exercises.map(exercise => ({
            name: exercise.name,
            sets: Number.parseInt(exercise.sets) || 0,
            reps: exercise.reps,
            rest: exercise.rest,
            notes: exercise.notes
          }))
        }))
      })
      
      if (onSave) onSave()
    } catch (error) {
      console.error('Error saving workout plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  return (
    <Card className="w-full bg-white shadow-lg border-0">
      <CardHeader className="bg-gradient-to-r from-purple-500/10 to-purple-700/10 rounded-t-lg">
        <CardTitle className="text-xl font-outfit text-purple-800">Create Workout Plan</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="title" className="text-sm font-medium">Plan Title</Label>
              <Input 
                id="title" 
                placeholder="e.g. Strength Training Program"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="description" className="text-sm font-medium">Plan Description</Label>
              <Textarea 
                id="description" 
                placeholder="Brief description of the workout plan"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 resize-none h-20"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="duration" className="text-sm font-medium">Duration (Weeks)</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger id="duration" className="mt-1">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 week</SelectItem>
                    <SelectItem value="2">2 weeks</SelectItem>
                    <SelectItem value="4">4 weeks</SelectItem>
                    <SelectItem value="8">8 weeks</SelectItem>
                    <SelectItem value="12">12 weeks</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="frequency" className="text-sm font-medium">Frequency (Days per Week)</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger id="frequency" className="mt-1">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 day</SelectItem>
                    <SelectItem value="2">2 days</SelectItem>
                    <SelectItem value="3">3 days</SelectItem>
                    <SelectItem value="4">4 days</SelectItem>
                    <SelectItem value="5">5 days</SelectItem>
                    <SelectItem value="6">6 days</SelectItem>
                    <SelectItem value="7">7 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-4">
                <Label className="text-sm font-medium">Workouts</Label>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm" 
                  onClick={addWorkout}
                  className="h-8 px-2 text-xs"
                >
                  <Plus className="h-3.5 w-3.5 mr-1" />
                  Add Workout Day
                </Button>
              </div>
              
              <div className="space-y-8">
                {workouts.map((workout) => (
                  <Card key={workout.id} className="border border-gray-200">
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
                        <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                          <Select 
                            value={workout.day} 
                            onValueChange={(value) => updateWorkout(workout.id, 'day', value)}
                          >
                            <SelectTrigger className="w-full md:w-32">
                              <SelectValue placeholder="Select day" />
                            </SelectTrigger>
                            <SelectContent>
                              {days.map(day => (
                                <SelectItem key={day} value={day}>{day}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <Input 
                            placeholder="Workout Name (e.g. Upper Body)"
                            value={workout.name}
                            onChange={(e) => updateWorkout(workout.id, 'name', e.target.value)}
                            className="flex-1"
                            required
                          />
                        </div>
                        
                        {workouts.length > 1 && (
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => removeWorkout(workout.id)}
                            className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 shrink-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      
                      <div className="mb-4">
                        <Textarea 
                          placeholder="Workout description, goals, or special instructions"
                          value={workout.description}
                          onChange={(e) => updateWorkout(workout.id, 'description', e.target.value)}
                          className="resize-none h-16"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="text-sm font-medium flex items-center">
                            <Dumbbell className="h-4 w-4 mr-1" />
                            Exercises
                          </Label>
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="sm" 
                            onClick={() => addExercise(workout.id)}
                            className="h-7 px-2 text-xs"
                          >
                            <Plus className="h-3 w-3 mr-1" />
                            Add Exercise
                          </Button>
                        </div>
                        
                        <div className="space-y-3">
                          {workout.exercises.map((exercise) => (
                            <div key={exercise.id} className="border border-gray-100 rounded-md p-3 bg-gray-50">
                              <div className="flex justify-between items-center mb-3">
                                <Input 
                                  placeholder="Exercise Name"
                                  value={exercise.name}
                                  onChange={(e) => updateExercise(workout.id, exercise.id, 'name', e.target.value)}
                                  className="max-w-[300px]"
                                  required
                                />
                                
                                {workout.exercises.length > 1 && (
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => removeExercise(workout.id, exercise.id)}
                                    className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                  </Button>
                                )}
                              </div>
                              
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3">
                                <div>
                                  <Label className="text-xs">Sets</Label>
                                  <Input 
                                    type="number"
                                    placeholder="e.g. 3"
                                    value={exercise.sets}
                                    onChange={(e) => updateExercise(workout.id, exercise.id, 'sets', e.target.value)}
                                    className="mt-1"
                                  />
                                </div>
                                <div>
                                  <Label className="text-xs">Reps/Time</Label>
                                  <Input
\
Let's create the Payment/Checkout page:
