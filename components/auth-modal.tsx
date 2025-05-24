"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Loader2 } from "lucide-react"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "signup"
}

export default function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"login" | "signup">(defaultTab)
  const [role, setRole] = useState<"client" | "trainer">("client")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate login process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // For development, we'll just redirect to the appropriate dashboard
    if (role === "client") {
      router.push("/client/dashboard")
    } else {
      router.push("/trainer/dashboard")
    }

    setIsLoading(false)
    onClose()
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setSuccess("Account created successfully!")
    setIsLoading(false)

    // Automatically switch to login after successful signup
    setTimeout(() => {
      setActiveTab("login")
      setSuccess("")
    }, 2000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        {process.env.NODE_ENV === "development" && (
          <div className="mb-4 p-2 bg-yellow-100 rounded-md">
            <p className="text-sm text-yellow-800 mb-2">Development Mode</p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.setItem("user_role", "client")
                  localStorage.setItem("user_id", "1")
                  onClose()
                  router.refresh()
                }}
              >
                Login as Client
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  localStorage.setItem("user_role", "trainer")
                  localStorage.setItem("user_id", "1")
                  onClose()
                  router.refresh()
                }}
              >
                Login as Trainer
              </Button>
            </div>
          </div>
        )}
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {activeTab === "login" ? "Welcome Back" : "Create Your Account"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {activeTab === "login"
              ? "Sign in to your account to continue your fitness journey"
              : "Join HealthyThako to find the perfect trainer or offer your services"}
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* Login Form */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="login-password">Password</Label>
                  <Button variant="link" className="p-0 h-auto text-xs">
                    Forgot password?
                  </Button>
                </div>
                <Input id="login-password" type="password" placeholder="••••••••" required />
              </div>

              <RadioGroup defaultValue={role} onValueChange={(value) => setRole(value as "client" | "trainer")}>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="client" id="login-client" />
                    <Label htmlFor="login-client">I'm a Client</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="trainer" id="login-trainer" />
                    <Label htmlFor="login-trainer">I'm a Trainer</Label>
                  </div>
                </div>
              </RadioGroup>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  <>Sign In</>
                )}
              </Button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Google"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Google
                </Button>
                <Button variant="outline" type="button" className="w-full">
                  <Image
                    src="/placeholder.svg?height=20&width=20"
                    alt="Facebook"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Facebook
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Sign Up Form */}
          <TabsContent value="signup">
            <form onSubmit={handleSignup} className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-first-name">First Name</Label>
                  <Input id="signup-first-name" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-last-name">Last Name</Label>
                  <Input id="signup-last-name" placeholder="Doe" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="your.email@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="••••••••" required />
              </div>

              <div className="space-y-3">
                <Label>I want to join as:</Label>
                <RadioGroup defaultValue={role} onValueChange={(value) => setRole(value as "client" | "trainer")}>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-pink-500 transition-colors relative">
                      <RadioGroupItem value="client" id="signup-client" className="sr-only" />
                      <Label
                        htmlFor="signup-client"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                          <Image
                            src="/placeholder.svg?height=24&width=24"
                            alt="Client"
                            width={24}
                            height={24}
                            className="text-pink-700"
                          />
                        </div>
                        <span className="font-medium">Client</span>
                        <span className="text-xs text-gray-500 text-center mt-1">Find and book fitness trainers</span>
                      </Label>
                      {role === "client" && (
                        <div className="absolute top-2 right-2 h-5 w-5 bg-pink-700 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                    <div className="border rounded-lg p-4 cursor-pointer hover:border-pink-500 transition-colors relative">
                      <RadioGroupItem value="trainer" id="signup-trainer" className="sr-only" />
                      <Label
                        htmlFor="signup-trainer"
                        className="flex flex-col items-center justify-center cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-2">
                          <Image
                            src="/placeholder.svg?height=24&width=24"
                            alt="Trainer"
                            width={24}
                            height={24}
                            className="text-purple-700"
                          />
                        </div>
                        <span className="font-medium">Trainer</span>
                        <span className="text-xs text-gray-500 text-center mt-1">Offer your training services</span>
                      </Label>
                      {role === "trainer" && (
                        <div className="absolute top-2 right-2 h-5 w-5 bg-pink-700 rounded-full flex items-center justify-center">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" required />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <a href="#" className="text-pink-700 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-pink-700 hover:underline">
                    Privacy Policy
                  </a>
                </Label>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}
              {success && <p className="text-sm text-green-500">{success}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-pink-700 to-purple-700 hover:from-pink-600 hover:to-purple-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  <>Create Account</>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
