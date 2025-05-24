"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { type UserRole, getCurrentUserRole, setCurrentUserRole, DEV_MODE } from "@/lib/auth-bypass"
import { User, Users, Dumbbell, Shield } from "lucide-react"

export function DevUserSwitcher() {
  const [currentRole, setCurrentRole] = useState<UserRole>(null)

  useEffect(() => {
    // Only run on client
    setCurrentRole(getCurrentUserRole())
  }, [])

  if (!DEV_MODE) return null

  const handleRoleChange = (role: UserRole) => {
    setCurrentUserRole(role)
    setCurrentRole(role)

    // Redirect to appropriate dashboard
    if (role === "client") {
      window.location.href = "/client/dashboard"
    } else if (role === "trainer") {
      window.location.href = "/trainer/dashboard"
    } else if (role === "admin") {
      window.location.href = "/admin/dashboard"
    }
  }

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "client":
        return <User className="h-4 w-4 mr-2" />
      case "trainer":
        return <Dumbbell className="h-4 w-4 mr-2" />
      case "admin":
        return <Shield className="h-4 w-4 mr-2" />
      default:
        return <Users className="h-4 w-4 mr-2" />
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-2 border border-gray-200 dark:border-gray-700">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            {getRoleIcon(currentRole)}
            <span>{currentRole ? `${currentRole.charAt(0).toUpperCase()}${currentRole.slice(1)}` : "Select Role"}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleRoleChange("client")}>
            <User className="h-4 w-4 mr-2" />
            <span>Client</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("trainer")}>
            <Dumbbell className="h-4 w-4 mr-2" />
            <span>Trainer</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleRoleChange("admin")}>
            <Shield className="h-4 w-4 mr-2" />
            <span>Admin</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
