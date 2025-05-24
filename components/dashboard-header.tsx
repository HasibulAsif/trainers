"use client"

import Link from "next/link"
import { MessageSquare, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import NotificationDropdown from "@/components/notification-dropdown"

interface DashboardHeaderProps {
  userType: "client" | "trainer"
}

export default function DashboardHeader({ userType }: DashboardHeaderProps) {
  // In a real app, you would get the user ID from authentication
  const userId = userType === "client" ? "client-123" : "trainer-456"

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-6 h-16 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center mr-8">
            <span className="font-bold text-xl">
              HealthyThako <span className="text-pink-600">Trainers</span>
            </span>
          </Link>

          <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <NotificationDropdown userId={userId} userType={userType} />

          <Link href={`/${userType}/messages`}>
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>
          </Link>

          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>{userType === "client" ? "CL" : "TR"}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
