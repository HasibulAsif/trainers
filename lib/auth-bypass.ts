export type UserRole = "client" | "trainer" | "admin" | null

// Export isDevelopment instead of DEV_MODE
export const isDevelopment = process.env.NODE_ENV === "development"

export function getCurrentUserRole(): UserRole {
  if (typeof localStorage !== "undefined") {
    return (localStorage.getItem("user_role") as UserRole) || null
  }
  return null
}

export function setCurrentUserRole(role: UserRole): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("user_role", role || "")
  }
}

export function getMockUserData(role: UserRole): { id: string; name: string; role: UserRole } | null {
  if (!isDevelopment || !role) return null

  let id: string
  let name: string

  switch (role) {
    case "client":
      id = "client-123"
      name = "Demo Client"
      break
    case "trainer":
      id = "trainer-456"
      name = "Demo Trainer"
      break
    default:
      return null
  }

  return { id, name, role }
}

// Helper function to set development user
export function setDevelopmentUser(role: UserRole): void {
  if (!isDevelopment) return

  setCurrentUserRole(role)

  // Reload the page to apply changes
  if (typeof window !== "undefined") {
    window.location.reload()
  }
}

// Helper function to clear development user
export function clearDevelopmentUser(): void {
  if (!isDevelopment) return

  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("user_role")
  }

  // Reload the page to apply changes
  if (typeof window !== "undefined") {
    window.location.reload()
  }
}

export const DEV_MODE = process.env.NODE_ENV === "development"
