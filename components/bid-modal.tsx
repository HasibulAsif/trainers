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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { submitBid } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface BidModalProps {
  isOpen: boolean
  onClose: () => void
  requestId: string
}

export function BidModal({ isOpen, onClose, requestId }: BidModalProps) {
  const [loading, setLoading] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState("basic")
  const [price, setPrice] = useState("")
  const [deliveryTime, setDeliveryTime] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitBid({
        requestId,
        planType: selectedPlan,
        price: Number.parseFloat(price),
        deliveryTime: Number.parseInt(deliveryTime),
        message,
      })

      toast({
        title: "Bid submitted successfully",
        description: "The client will be notified of your proposal.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Failed to submit bid",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Submit Your Proposal
          </DialogTitle>
          <DialogDescription>Provide details about your service offering for this request.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="plan-type" className="text-sm font-medium">
                Service Plan
              </Label>
              <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="grid grid-cols-3 gap-4 mt-2">
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-purple-400 transition-all cursor-pointer">
                  <RadioGroupItem value="basic" id="basic" />
                  <Label htmlFor="basic" className="cursor-pointer">
                    Basic
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-purple-400 transition-all cursor-pointer">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard" className="cursor-pointer">
                    Standard
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border rounded-lg p-3 hover:border-purple-400 transition-all cursor-pointer">
                  <RadioGroupItem value="premium" id="premium" />
                  <Label htmlFor="premium" className="cursor-pointer">
                    Premium
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price" className="text-sm font-medium">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  type="number"
                  min="1"
                  step="0.01"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="99.99"
                  className="mt-1"
                  required
                />
              </div>
              <div>
                <Label htmlFor="delivery-time" className="text-sm font-medium">
                  Delivery Time (days)
                </Label>
                <Input
                  id="delivery-time"
                  type="number"
                  min="1"
                  value={deliveryTime}
                  onChange={(e) => setDeliveryTime(e.target.value)}
                  placeholder="7"
                  className="mt-1"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="message" className="text-sm font-medium">
                Message to Client
              </Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Describe your approach and why you're the best fit for this request..."
                className="mt-1 min-h-[120px]"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Bid"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
