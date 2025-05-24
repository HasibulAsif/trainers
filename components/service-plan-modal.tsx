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
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { createServicePlan } from "@/lib/actions"
import { toast } from "@/hooks/use-toast"

interface ServicePlanModalProps {
  isOpen: boolean
  onClose: () => void
  existingPlans?: any
}

export function ServicePlanModal({ isOpen, onClose, existingPlans }: ServicePlanModalProps) {
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("basic")

  const [basicPlan, setBasicPlan] = useState({
    title: existingPlans?.basic?.title || "",
    description: existingPlans?.basic?.description || "",
    price: existingPlans?.basic?.price || "",
    deliveryTime: existingPlans?.basic?.deliveryTime || "",
    features: existingPlans?.basic?.features || "",
  })

  const [standardPlan, setStandardPlan] = useState({
    title: existingPlans?.standard?.title || "",
    description: existingPlans?.standard?.description || "",
    price: existingPlans?.standard?.price || "",
    deliveryTime: existingPlans?.standard?.deliveryTime || "",
    features: existingPlans?.standard?.features || "",
  })

  const [premiumPlan, setPremiumPlan] = useState({
    title: existingPlans?.premium?.title || "",
    description: existingPlans?.premium?.description || "",
    price: existingPlans?.premium?.price || "",
    deliveryTime: existingPlans?.premium?.deliveryTime || "",
    features: existingPlans?.premium?.features || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createServicePlan({
        basic: basicPlan,
        standard: standardPlan,
        premium: premiumPlan,
      })

      toast({
        title: "Service plans saved",
        description: "Your service plans have been updated successfully.",
      })
      onClose()
    } catch (error) {
      toast({
        title: "Failed to save service plans",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const updatePlan = (plan: string, field: string, value: string) => {
    if (plan === "basic") {
      setBasicPlan((prev) => ({ ...prev, [field]: value }))
    } else if (plan === "standard") {
      setStandardPlan((prev) => ({ ...prev, [field]: value }))
    } else if (plan === "premium") {
      setPremiumPlan((prev) => ({ ...prev, [field]: value }))
    }
  }

  const renderPlanForm = (plan: string, data: any) => (
    <div className="space-y-4">
      <div>
        <Label htmlFor={`${plan}-title`} className="text-sm font-medium">
          Title
        </Label>
        <Input
          id={`${plan}-title`}
          value={data.title}
          onChange={(e) => updatePlan(plan, "title", e.target.value)}
          placeholder="e.g., Basic Fitness Plan"
          className="mt-1"
          required
        />
      </div>

      <div>
        <Label htmlFor={`${plan}-description`} className="text-sm font-medium">
          Description
        </Label>
        <Textarea
          id={`${plan}-description`}
          value={data.description}
          onChange={(e) => updatePlan(plan, "description", e.target.value)}
          placeholder="Brief description of what's included..."
          className="mt-1"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${plan}-price`} className="text-sm font-medium">
            Price ($)
          </Label>
          <Input
            id={`${plan}-price`}
            type="number"
            min="1"
            step="0.01"
            value={data.price}
            onChange={(e) => updatePlan(plan, "price", e.target.value)}
            placeholder="99.99"
            className="mt-1"
            required
          />
        </div>
        <div>
          <Label htmlFor={`${plan}-delivery`} className="text-sm font-medium">
            Delivery Time (days)
          </Label>
          <Input
            id={`${plan}-delivery`}
            type="number"
            min="1"
            value={data.deliveryTime}
            onChange={(e) => updatePlan(plan, "deliveryTime", e.target.value)}
            placeholder="7"
            className="mt-1"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor={`${plan}-features`} className="text-sm font-medium">
          Features (one per line)
        </Label>
        <Textarea
          id={`${plan}-features`}
          value={data.features}
          onChange={(e) => updatePlan(plan, "features", e.target.value)}
          placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
          className="mt-1 min-h-[120px]"
          required
        />
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
            Service Plans
          </DialogTitle>
          <DialogDescription>
            Create or edit your service plans. Clients will see these options when booking your services.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="standard">Standard</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="mt-0">
              {renderPlanForm("basic", basicPlan)}
            </TabsContent>

            <TabsContent value="standard" className="mt-0">
              {renderPlanForm("standard", standardPlan)}
            </TabsContent>

            <TabsContent value="premium" className="mt-0">
              {renderPlanForm("premium", premiumPlan)}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-purple-600 to-purple-400 text-white"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Plans"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
