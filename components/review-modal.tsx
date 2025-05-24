"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import ReviewForm from "@/components/review-form"
import type { Trainer } from "@/lib/types"

interface ReviewModalProps {
  isOpen: boolean
  onClose: () => void
  trainer: Trainer
  clientId: string
  bookingId?: string
}

export default function ReviewModal({ isOpen, onClose, trainer, clientId, bookingId }: ReviewModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Leave a Review</DialogTitle>
        </DialogHeader>
        <ReviewForm
          trainer={trainer}
          clientId={clientId}
          bookingId={bookingId}
          onSuccess={onClose}
          onCancel={onClose}
        />
      </DialogContent>
    </Dialog>
  )
}
