"use client"

import type React from "react"

import { useState } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { bookSession } from "@/lib/actions"
import type { Trainer } from "@/lib/types"

interface BookingModalProps {
  trainer: Trainer
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ trainer, isOpen, onClose }: BookingModalProps) {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>()
  const [sessionType, setSessionType] = useState<string>("in_person")
  const [notes, setNotes] = useState<string>("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState<{ success: boolean; message: string; bookingId?: string } | null>(
    null,
  )

  // Generate time slots from 7am to 8pm
  const timeSlots = Array.from({ length: 14 }, (_, i) => {
    const hour = i + 7
    return `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? "AM" : "PM"}`
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!date || !time || !sessionType) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("trainerId", trainer.id)
      formData.append("date", format(date, "yyyy-MM-dd"))
      formData.append("time", time)
      formData.append("sessionType", sessionType)
      formData.append("notes", notes)

      const result = await bookSession(formData)
      setBookingResult(result)
    } catch (error) {
      console.error("Error booking session:", error)
      setBookingResult({
        success: false,
        message: "There was an error booking your session. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Reset form state
    setDate(undefined)
    setTime(undefined)
    setSessionType("in_person")
    setNotes("")
    setBookingResult(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Book a Session with {trainer.name}</DialogTitle>
          <DialogDescription>
            Fill out the form below to schedule a training session. You'll receive a confirmation once the trainer
            accepts.
          </DialogDescription>
        </DialogHeader>

        {bookingResult ? (
          <div className="py-6">
            <div
              className={`p-4 mb-4 rounded-lg ${
                bookingResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              <p className="font-medium">{bookingResult.message}</p>
              {bookingResult.bookingId && (
                <p className="mt-2 text-sm">
                  Booking reference: <span className="font-mono font-medium">{bookingResult.bookingId}</span>
                </p>
              )}
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Date</label>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 opacity-50" />
                  <div className={cn("w-full", !date && "text-muted-foreground")}>
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) =>
                    date < new Date() || date > new Date(new Date().setMonth(new Date().getMonth() + 2))
                  }
                  initialFocus
                  className="rounded-md border"
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Select Time</label>
                <Select onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time">
                      <div className="flex items-center gap-2">
                        {time ? (
                          <>
                            <Clock className="h-4 w-4" />
                            {time}
                          </>
                        ) : (
                          "Select a time"
                        )}
                      </div>
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Session Type</label>
                <Select defaultValue={sessionType} onValueChange={setSessionType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select session type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_person">In-Person</SelectItem>
                    {trainer.online_available && <SelectItem value="online">Online</SelectItem>}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <Textarea
                  placeholder="Tell the trainer about your fitness goals or any specific requirements"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!date || !time || !sessionType || isSubmitting}
                className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
              >
                {isSubmitting ? "Booking..." : "Book Session"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
