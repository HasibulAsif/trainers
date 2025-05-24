"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { contactTrainer } from "@/lib/actions"
import type { Trainer } from "@/lib/types"

interface ContactModalProps {
  trainer: Trainer
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ trainer, isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [contactResult, setContactResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !email || !message) return

    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("trainerId", trainer.id)
      formData.append("name", name)
      formData.append("email", email)
      formData.append("message", message)

      const result = await contactTrainer(formData)
      setContactResult(result)
    } catch (error) {
      console.error("Error contacting trainer:", error)
      setContactResult({
        success: false,
        message: "There was an error sending your message. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    // Reset form state
    setName("")
    setEmail("")
    setMessage("")
    setContactResult(null)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Contact {trainer.name}</DialogTitle>
          <DialogDescription>
            Send a message to {trainer.name} with any questions you have about their services.
          </DialogDescription>
        </DialogHeader>

        {contactResult ? (
          <div className="py-6">
            <div
              className={`p-4 mb-4 rounded-lg ${
                contactResult.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
              }`}
            >
              <p className="font-medium">{contactResult.message}</p>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Your Name</label>
                <Input placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Your Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  placeholder="What would you like to ask the trainer?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="min-h-[120px]"
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!name || !email || !message || isSubmitting}
                className="bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
