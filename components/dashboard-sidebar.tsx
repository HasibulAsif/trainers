"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  MessageSquare,
  Settings,
  User,
  Users,
  FileText,
  Bell,
  Star,
  LayoutDashboard,
  ShoppingBag,
  Briefcase,
  BarChart,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardSidebarProps {
  userType: "client" | "trainer"
}

export default function DashboardSidebar({ userType }: DashboardSidebarProps) {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<string[]>([])

  const toggleMenu = (menu: string) => {
    if (openMenus.includes(menu)) {
      setOpenMenus(openMenus.filter((item) => item !== menu))
    } else {
      setOpenMenus([...openMenus, menu])
    }
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  // Update the clientLinks array to include our new pages
  const clientLinks = [
    { href: "/client/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/client/requests", label: "My Requests", icon: FileText },
    { href: "/client/orders", label: "My Orders", icon: ShoppingBag },
    { href: "/client/bookings", label: "My Bookings", icon: Calendar },
    { href: "/client/messages", label: "Messages", icon: MessageSquare },
    { href: "/client/notifications", label: "Notifications", icon: Bell },
    { href: "/client/profile", label: "My Profile", icon: User },
    { href: "/client/settings", label: "Settings", icon: Settings },
  ]

  // Update the trainerLinks array to include our new pages
  const trainerLinks = [
    { href: "/trainer/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/trainer/requests", label: "Client Requests", icon: FileText },
    { href: "/trainer/orders", label: "Orders", icon: ShoppingBag },
    { href: "/trainer/bookings/upcoming", label: "Bookings", icon: Calendar },
    { href: "/trainer/messages", label: "Messages", icon: MessageSquare },
    { href: "/trainer/notifications", label: "Notifications", icon: Bell },
    { href: "/trainer/reviews", label: "Reviews", icon: Star },
    { href: "/trainer/services", label: "My Services", icon: Briefcase },
    { href: "/trainer/analytics", label: "Analytics", icon: BarChart },
    { href: "/trainer/profile/edit", label: "Edit Profile", icon: User },
    { href: "/trainer/settings/personal", label: "Settings", icon: Settings },
  ]

  const clientMenuItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/client/dashboard",
    },
    {
      title: "My Bookings",
      icon: <Calendar className="h-5 w-5" />,
      href: "/client/bookings",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/client/messages",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/client/notifications",
    },
    {
      title: "My Requests",
      icon: <FileText className="h-5 w-5" />,
      href: "/client/requests",
    },
    {
      title: "My Orders",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/client/orders",
    },
    {
      title: "Favorite Trainers",
      icon: <Users className="h-5 w-5" />,
      href: "/client/favorites",
    },
    {
      title: "Payment History",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/client/payments",
    },
    {
      title: "Profile Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/client/settings",
    },
  ]

  const trainerMenuItems = [
    {
      title: "Dashboard",
      icon: <Home className="h-5 w-5" />,
      href: "/trainer/dashboard",
    },
    {
      title: "Bookings",
      icon: <Calendar className="h-5 w-5" />,
      submenu: [
        {
          title: "Upcoming Sessions",
          href: "/trainer/bookings/upcoming",
        },
        {
          title: "Past Sessions",
          href: "/trainer/bookings/past",
        },
        {
          title: "Availability",
          href: "/trainer/bookings/availability",
        },
      ],
    },
    {
      title: "Client Requests",
      icon: <FileText className="h-5 w-5" />,
      href: "/trainer/requests",
    },
    {
      title: "Orders",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/trainer/orders",
    },
    {
      title: "Clients",
      icon: <Users className="h-5 w-5" />,
      href: "/trainer/clients",
    },
    {
      title: "Messages",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/trainer/messages",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      href: "/trainer/notifications",
    },
    {
      title: "Reviews",
      icon: <Star className="h-5 w-5" />,
      href: "/trainer/reviews",
    },
    {
      title: "Earnings",
      icon: <CreditCard className="h-5 w-5" />,
      href: "/trainer/earnings",
    },
    {
      title: "Analytics",
      icon: <BarChart2 className="h-5 w-5" />,
      href: "/trainer/analytics",
    },
    {
      title: "Profile Settings",
      icon: <Settings className="h-5 w-5" />,
      submenu: [
        {
          title: "Personal Info",
          href: "/trainer/settings/personal",
        },
        {
          title: "Profile",
          href: "/trainer/settings/profile",
        },
        {
          title: "Certifications",
          href: "/trainer/settings/certifications",
        },
        {
          title: "Services",
          href: "/trainer/settings/services",
        },
      ],
    },
  ]

  const menuItems = userType === "client" ? clientMenuItems : trainerMenuItems

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
            <AvatarFallback>{userType === "client" ? "CL" : "TR"}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{userType === "client" ? "John Doe" : "Sarah Smith"}</p>
            <p className="text-xs text-gray-500">{userType === "client" ? "Client" : "Fitness Trainer"}</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div className="mb-1">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal hover:bg-gray-100 hover:text-gray-900",
                      openMenus.includes(item.title) && "bg-gray-100 text-gray-900",
                    )}
                    onClick={() => toggleMenu(item.title)}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                    <ChevronDown
                      className={cn(
                        "ml-auto h-4 w-4 transition-transform",
                        openMenus.includes(item.title) && "rotate-180",
                      )}
                    />
                  </Button>
                  {openMenus.includes(item.title) && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subitem, subindex) => (
                        <Link
                          key={subindex}
                          href={subitem.href}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md hover:bg-gray-100 hover:text-gray-900",
                            isActive(subitem.href) && "bg-gray-100 text-gray-900 font-medium",
                          )}
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link href={item.href} key={index}>
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start font-normal hover:bg-gray-100 hover:text-gray-900",
                      isActive(item.href) && "bg-gray-100 text-gray-900",
                    )}
                  >
                    {item.icon}
                    <span className="ml-3">{item.title}</span>
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-6 border-t border-gray-200">
        <Link href="/">
          <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <User className="h-5 w-5 mr-3" />
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  )
}
