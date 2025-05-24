"use client"

import { useState, useEffect } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/lib/actions"
import { useRouter } from "next/navigation"
import type { Notification } from "@/lib/types"

export default function ClientNotificationsPage() {
  const router = useRouter()
  // In a real app, you would get the client ID from authentication
  const clientId = "client-123"

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      const data = await getNotifications(clientId, "client")
      setNotifications(data)
      setLoading(false)
    }

    fetchNotifications()
  }, [clientId])

  const handleNotificationClick = async (notification: Notification) => {
    // Mark as read
    if (!notification.read) {
      await markNotificationAsRead(notification.id)
      setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))
    }

    // Navigate to the link if provided
    if (notification.link) {
      router.push(notification.link)
    }
  }

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead(clientId, "client")
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "message":
        return "💬"
      case "booking":
        return "📅"
      case "review":
        return "⭐"
      case "payment":
        return "💰"
      default:
        return "🔔"
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

    if (diffInSeconds < 60) {
      return "just now"
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60)
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600)
      return `${hours} hour${hours > 1 ? "s" : ""} ago`
    } else {
      const days = Math.floor(diffInSeconds / 86400)
      return `${days} day${days > 1 ? "s" : ""} ago`
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DashboardSidebar userType="client" />
      <div className="flex-1">
        <DashboardHeader userType="client" />
        <main className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Notifications</h1>
              <p className="text-gray-600">Stay updated with your fitness journey</p>
            </div>
            {notifications.some((n) => !n.read) && <Button onClick={handleMarkAllAsRead}>Mark all as read</Button>}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-pink-700 border-r-transparent"></div>
                  <p className="mt-4 text-gray-600">Loading notifications...</p>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        notification.read ? "bg-white" : "bg-gray-50"
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getNotificationIcon(notification.type)}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className={`font-medium ${notification.read ? "text-gray-700" : "text-gray-900"}`}>
                              {notification.title}
                            </h3>
                            <span className="text-xs text-gray-500">{formatTimeAgo(notification.created_at)}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          {notification.link && (
                            <Button variant="link" className="p-0 h-auto text-pink-600 mt-1">
                              View details
                            </Button>
                          )}
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-pink-600 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
