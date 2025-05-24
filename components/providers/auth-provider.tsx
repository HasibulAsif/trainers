"use client"

import { useState, useEffect, createContext, type ReactNode } from "react"

type User = {
  id: string
  role: "client" | "trainer" | null
}

type AuthContextType = {
  user: User | null
  login: (role: "client" | "trainer", id: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Check if we're in development mode and have a stored user
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem("user_role")
      const storedId = localStorage.getItem("user_id")

      if (storedRole && storedId) {
        setUser({
          id: storedId,
          role: storedRole as "client" | "trainer",
        })
      }
    }
  }, [])

  const login = (role: "client" | "trainer", id: string) => {
    localStorage.setItem("user_role", role)
    localStorage.setItem("user_id", id)
    setUser({ id, role })
  }

  const logout = () => {
    localStorage.removeItem("user_role")
    localStorage.removeItem("user_id")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}
