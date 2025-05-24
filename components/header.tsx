"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import AuthModal from "@/components/auth-modal"
import { Menu, X } from "lucide-react"
import { isDevelopment, getCurrentUserRole, setDevelopmentUser } from "@/lib/auth-bypass"

export default function Header() {
  const pathname = usePathname()
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "signup">("login")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState<string | null>(null)

  // Check if we're on a dashboard page
  const isDashboardPage = pathname?.includes("/client/") || pathname?.includes("/trainer/")

  // Determine header style based on page
  const isTransparent = pathname === "/" || pathname === "/trainers"

  useEffect(() => {
    // Check if we're in development mode and have a stored user
    if (typeof window !== "undefined") {
      const storedRole = getCurrentUserRole()
      if (storedRole) {
        setUserRole(storedRole)
      }
    }
  }, [])

  const handleDemoLogin = (role: "client" | "trainer") => {
    setDevelopmentUser(role)
  }

  return (
    <>
      <header
        className={`${
          isTransparent
            ? "absolute top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md border-b border-white/10"
            : "bg-white border-b border-gray-200 sticky top-0 z-50"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex items-center">
            <span className={`font-bold text-xl md:text-2xl ${isTransparent ? "text-white" : "text-gray-900"}`}>
              HealthyThako <span className="text-pink-600">Trainers</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-gray-900"
              } transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/trainers"
              className={`${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-gray-900"
              } transition-colors`}
            >
              Trainers
            </Link>
            <Link
              href="/categories"
              className={`${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-gray-900"
              } transition-colors`}
            >
              Categories
            </Link>
            <Link
              href="/how-it-works"
              className={`${
                isTransparent ? "text-white/80 hover:text-white" : "text-gray-700 hover:text-gray-900"
              } transition-colors`}
            >
              How It Works
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isDashboardPage && (
              <a
                href="https://forms.fillout.com/t/1aYRBKp8gaus"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  className={
                    isTransparent
                      ? "bg-gradient-to-r from-[#3c0747] via-[#c90e5c] to-[#57001a] hover:opacity-90 text-white font-medium shadow-lg shadow-pink-900/20"
                      : "bg-gradient-to-r from-[#3c0747] via-[#c90e5c] to-[#57001a] hover:opacity-90 text-white font-medium"
                  }
                >
                  Join Waitlist
                </Button>
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className={isTransparent ? "text-white" : "text-gray-900"} />
            ) : (
              <Menu className={isTransparent ? "text-white" : "text-gray-900"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-200">
            <div className="container mx-auto py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/trainers"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Trainers
                </Link>
                <Link
                  href="/categories"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  href="/how-it-works"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  How It Works
                </Link>
              </nav>

              <div className="flex flex-col space-y-2 p-4">
                <a
                  href="https://forms.fillout.com/t/1aYRBKp8gaus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-[#3c0747] via-[#c90e5c] to-[#57001a] hover:opacity-90 text-white font-medium"
                  >
                    Join Waitlist
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </>
  )
}
