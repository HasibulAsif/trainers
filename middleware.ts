import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Skip middleware in development mode
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next()
  }

  const path = request.nextUrl.pathname

  // Check if the path is a protected route
  const isClientRoute = path.startsWith("/client/")
  const isTrainerRoute = path.startsWith("/trainer/")

  if (!isClientRoute && !isTrainerRoute) {
    return NextResponse.next()
  }

  // In production, we would check for authentication here
  // For now, we'll just redirect to the login page

  // Get the authentication status from cookies or headers
  const isAuthenticated = false // This would be a real check in production

  if (!isAuthenticated) {
    // Redirect to the home page with a query parameter to open the auth modal
    return NextResponse.redirect(new URL("/?auth=login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/client/:path*", "/trainer/:path*"],
}
