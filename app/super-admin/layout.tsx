"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import type { ReactNode } from "react"

export default function SuperAdminLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout requiredRole="super-admin">{children}</DashboardLayout>
}
