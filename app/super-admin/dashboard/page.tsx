"use client"

import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Users, TrendingUp, AlertTriangle, Activity } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function SuperAdminDashboard() {
  const { user } = useAuth()

  const analyticsData = [
    { date: "Mon", users: 1200, admins: 5, activity: 2400 },
    { date: "Tue", users: 1900, admins: 6, activity: 2210 },
    { date: "Wed", users: 2100, admins: 5, activity: 2290 },
    { date: "Thu", users: 2800, admins: 7, activity: 2000 },
    { date: "Fri", users: 3200, admins: 8, activity: 2181 },
    { date: "Sat", users: 2500, admins: 6, activity: 2500 },
    { date: "Sun", users: 2800, admins: 7, activity: 2100 },
  ]

  const auditData = [
    { time: "Mon", logins: 156, changes: 12, errors: 3 },
    { time: "Tue", logins: 178, changes: 18, errors: 2 },
    { time: "Wed", logins: 165, changes: 14, errors: 1 },
    { time: "Thu", logins: 192, changes: 21, errors: 4 },
    { time: "Fri", logins: 208, changes: 25, errors: 2 },
    { time: "Sat", logins: 124, changes: 8, errors: 0 },
    { time: "Sun", logins: 145, changes: 11, errors: 1 },
  ]

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">System Analytics & Control</h1>
        <p className="text-muted-foreground">Complete system overview and management</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-2xl font-bold">15,342</p>
            </div>
            <Users className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">+8.2% this week</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Admin Accounts</p>
              <p className="text-2xl font-bold">48</p>
            </div>
            <Activity className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">All active</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">System Health</p>
              <p className="text-2xl font-bold">99.9%</p>
            </div>
            <TrendingUp className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">Excellent</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Security Alerts</p>
              <p className="text-2xl font-bold">2</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-yellow-500/20" />
          </div>
          <p className="text-xs text-yellow-600 mt-2">Requires review</p>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">User Growth & Admin Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="users" stroke="#3b82f6" name="Total Users" />
              <Line yAxisId="right" type="monotone" dataKey="admins" stroke="#8b5cf6" name="Admins" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">System Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="activity" fill="#3b82f6" stroke="#3b82f6" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Audit Logs */}
      <Card className="p-6 mb-6">
        <h3 className="font-semibold mb-6">Audit Trail</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={auditData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="logins" stroke="#3b82f6" name="Logins" />
            <Line type="monotone" dataKey="changes" stroke="#8b5cf6" name="Changes" />
            <Line type="monotone" dataKey="errors" stroke="#ef4444" name="Errors" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Admin & System Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Admin Management</h3>
          <div className="space-y-3">
            {[
              { name: "John Admin", role: "Admin IT", status: "Active", department: "IT Operations" },
              { name: "Jane Manager", role: "Admin IT", status: "Active", department: "Security" },
              { name: "Mike Super", role: "Super Admin", status: "Active", department: "Executive" },
            ].map((admin, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium">{admin.name}</p>
                  <span className="text-xs px-2 py-1 bg-green-500/10 text-green-700 rounded">{admin.status}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {admin.role} • {admin.department}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Audit Events</h3>
          <div className="space-y-3">
            {[
              { event: "Admin created", user: "John", time: "1 hour ago" },
              { event: "Role permission updated", user: "Admin", time: "3 hours ago" },
              { event: "Security policy changed", user: "Super Admin", time: "1 day ago" },
              { event: "System backup completed", user: "System", time: "2 days ago" },
            ].map((audit, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{audit.event}</p>
                  <p className="text-xs text-muted-foreground">by {audit.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{audit.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
