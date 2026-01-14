"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth, type UserRole } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { login } = useAuth()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      if (!email || !password) {
        setError("Please fill in all fields")
        setIsLoading(false)
        return
      }

      const authenticatedUser = await login(email, password)

      const redirectPaths: Record<UserRole, string> = {
        user: "/user/dashboard",
        admin: "/admin/dashboard",
        "super-admin": "/super-admin/dashboard",
      }

      router.push(redirectPaths[authenticatedUser.role] ?? "/user/dashboard")
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed. Please try again."
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted/30 flex flex-col">
      {/* Back Button */}
      <div className="max-w-md mx-auto w-full px-4 pt-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Login Card */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md border border-border/50 shadow-lg">
          <div className="p-8">
            {/* Header */}
            <h1 className="text-2xl font-bold mb-2">Sign In</h1>
            <p className="text-sm text-muted-foreground mb-8">Login to your dashboard</p>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>



              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-muted/50 rounded-lg space-y-2 text-sm text-muted-foreground">
              <p className="font-medium text-foreground">Demo Accounts</p>
              <div className="space-y-1">
                <p>
                  User: <span className="font-mono">user@example.com</span> / <span className="font-mono">password</span>
                </p>
                <p>
                  Admin: <span className="font-mono">admin@example.com</span> / <span className="font-mono">password</span>
                </p>
                <p>
                  Super Admin: <span className="font-mono">superadmin@example.com</span> / <span className="font-mono">password</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
