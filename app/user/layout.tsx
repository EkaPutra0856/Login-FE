"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import type { ReactNode } from "react"

export default function UserLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout requiredRole="user">{children}</DashboardLayout>
}
