"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import type { ReactNode } from "react"

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout requiredRole="admin">{children}</DashboardLayout>
}
