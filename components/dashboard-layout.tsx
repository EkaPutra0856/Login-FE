"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { usePathname, useRouter } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"
import { Loader2 } from "lucide-react"
import type { ReactNode } from "react"

interface DashboardLayoutProps {
  children: ReactNode
  requiredRole?: string
}

export function DashboardLayout({ children, requiredRole }: DashboardLayoutProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const computedTitle = (() => {
    if (!pathname) return "Dashboard"
    const segments = pathname.split("/").filter(Boolean)
    const last = segments[segments.length - 1] || "dashboard"
    if (last === "dashboard") return "Dashboard"
    if (last === "profile") return "Profile"
    return last
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  })()
  // Redirect to login if not authenticated
  // Handle redirects in an effect to avoid updating router during render
  useEffect(() => {
    if (isLoading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (requiredRole && user.role !== requiredRole) {
      router.push(`/${user.role}/dashboard`)
      return
    }
  }, [isLoading, user, requiredRole, router])

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) return null

  if (requiredRole && user.role !== requiredRole) return null

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Navbar */}
        <Navbar title={computedTitle} onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
