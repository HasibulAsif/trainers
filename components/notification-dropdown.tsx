"use client"

import { useState, useEffect, useRef } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { getNotifications, markAllNotificationsAsRead, markNotificationAsRead } from "@/lib/actions"
import { createClientSupabaseClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import type { Notification } from "@/lib/types"
import type { RealtimeChannel } from "@supabase/supabase-js"

interface NotificationDropdownProps {
  userId: string
  userType: "client" | "trainer"
}

export default function NotificationDropdown({ userId, userType }: NotificationDropdownProps) {
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  // Ref for subscription channel
  const notificationsSubscriptionRef = useRef<RealtimeChannel | null>(null)

  const unreadCount = notifications.filter((notification) => !notification.read).length

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true)
      const data = await getNotifications(userId, userType)
      setNotifications(data)
      setLoading(false)
    }

    fetchNotifications()

    // Set up real-time subscription for notifications
    const supabase = createClientSupabaseClient()

    // Subscribe to notifications table changes
    const notificationsSubscription = supabase
      .channel(`${userType}-notifications-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
          filter: `user_id=eq.${userId}`,
        },
        async (payload) => {
          console.log("Notification change received:", payload)

          if (payload.eventType === "INSERT") {
            // Add the new notification to the list
            const newNotification = payload.new as Notification
            setNotifications((prev) => [newNotification, ...prev])
          } else if (payload.eventType === "UPDATE") {
            // Update the notification in the list
            const updatedNotification = payload.new as Notification
            setNotifications((prev) => prev.map((n) => (n.id === updatedNotification.id ? updatedNotification : n)))
          } else if (payload.eventType === "DELETE") {
            // Remove the notification from the list
            const deletedNotification = payload.old as Notification
            setNotifications((prev) => prev.filter((n) => n.id !== deletedNotification.id))
          }
        },
      )
      .subscribe()

    notificationsSubscriptionRef.current = notificationsSubscription

    return () => {
      // Clean up subscription
      if (notificationsSubscriptionRef.current) {
        supabase.removeChannel(notificationsSubscriptionRef.current)
      }
    }
  }, [userId, userType])

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

    setOpen(false)
  }

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead(userId, userType)
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
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="end">
        <DropdownMenuLabel className="flex justify-between items-center">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead} className="text-xs h-7">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">No notifications yet</div>
          ) : (
            notifications.map((notification) => (
              <DropdownMenuItem
                key={notification.id}
                className={`p-3 cursor-pointer ${!notification.read ? "bg-gray-50" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span>{getNotificationIcon(notification.type)}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{formatTimeAgo(notification.created_at)}</p>
                  </div>
                  {!notification.read && <div className="w-2 h-2 bg-blue-500 rounded-full self-start mt-2"></div>}
                </div>
              </DropdownMenuItem>
            ))
          )}
        </DropdownMenuGroup>
        {notifications.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="p-2 text-center text-sm text-blue-600 cursor-pointer"
              onClick={() => {
                router.push(`/${userType}/notifications`)
                setOpen(false)
              }}
            >
              View all notifications
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
