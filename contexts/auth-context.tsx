"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import {
  isDevelopment,
  getCurrentUserRole,
  setDevelopmentUser as setDevUser,
  clearDevelopmentUser,
} from "@/lib/auth-bypass"

type User = {
  id: string
  name: string
  role: "client" | "trainer" | "admin"
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  setDevelopmentUser: (role: "client" | "trainer") => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // Check if we're in development mode and have a stored user role
    if (isDevelopment) {
      const role = getCurrentUserRole()
      if (role) {
        setUser({
          id: role === "client" ? "client-123" : "trainer-456",
          name: role === "client" ? "Demo Client" : "Demo Trainer",
          role: role as "client" | "trainer",
        })
      }
    }
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, this would make an API call
    // For development, we'll just simulate a successful login
    if (isDevelopment) {
      setUser({
        id: "client-123",
        name: "Demo Client",
        role: "client",
      })
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    if (isDevelopment) {
      clearDevelopmentUser()
    }
  }

  const setDevelopmentUser = (role: "client" | "trainer") => {
    if (isDevelopment) {
      setDevUser(role)
      setUser({
        id: role === "client" ? "client-123" : "trainer-456",
        name: role === "client" ? "Demo Client" : "Demo Trainer",
        role,
      })
    }
  }

  return <AuthContext.Provider value={{ user, login, logout, setDevelopmentUser }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
