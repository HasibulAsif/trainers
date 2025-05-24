"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Settings } from "lucide-react"
import { isDevelopment, getCurrentUserRole, setDevelopmentUser, clearDevelopmentUser } from "@/lib/auth-bypass"

export default function DevToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const userRole = typeof window !== "undefined" ? getCurrentUserRole() : null

  if (!isDevelopment) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-64 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Dev Tools</h3>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current User: {userRole || "None"}</div>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setDevelopmentUser("client")}
            >
              Login as Client
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => setDevelopmentUser("trainer")}
            >
              Login as Trainer
            </Button>

            <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => clearDevelopmentUser()}>
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <Button
          variant="default"
          size="icon"
          className="bg-purple-600 hover:bg-purple-700"
          onClick={() => setIsOpen(true)}
        >
          <Settings className="h-4 w-4" />
        </Button>
      )}
    </div>
  )
}
