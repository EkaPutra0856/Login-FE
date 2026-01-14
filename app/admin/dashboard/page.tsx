"use client"

import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { Users, AlertCircle, CheckCircle, Clock } from "lucide-react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

export default function AdminDashboard() {
  const { user } = useAuth()

  const systemData = [
    { time: "00:00", cpu: 45, memory: 52, disk: 28 },
    { time: "04:00", cpu: 52, memory: 48, disk: 31 },
    { time: "08:00", cpu: 48, memory: 61, disk: 25 },
    { time: "12:00", cpu: 61, memory: 55, disk: 41 },
    { time: "16:00", cpu: 55, memory: 63, disk: 38 },
    { time: "20:00", cpu: 67, memory: 69, disk: 45 },
  ]

  const userLogins = [
    { date: "Mon", count: 120 },
    { date: "Tue", count: 145 },
    { date: "Wed", count: 132 },
    { date: "Thu", count: 156 },
    { date: "Fri", count: 178 },
    { date: "Sat", count: 98 },
    { date: "Sun", count: 112 },
  ]

  return (
    <>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">System Overview</h1>
        <p className="text-muted-foreground">Monitor system health and user activity</p>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Users</p>
              <p className="text-2xl font-bold">1,247</p>
            </div>
            <Users className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Sessions</p>
              <p className="text-2xl font-bold">342</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">All systems operational</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Alerts</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <AlertCircle className="w-10 h-10 text-yellow-500/20" />
          </div>
          <p className="text-xs text-yellow-600 mt-2">3 require attention</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Uptime</p>
              <p className="text-2xl font-bold">99.8%</p>
            </div>
            <Clock className="w-10 h-10 text-primary/20" />
          </div>
          <p className="text-xs text-green-600 mt-2">Last 30 days</p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-6">System Resources</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={systemData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cpu" stroke="#3b82f6" name="CPU %" />
              <Line type="monotone" dataKey="memory" stroke="#8b5cf6" name="Memory %" />
              <Line type="monotone" dataKey="disk" stroke="#ec4899" name="Disk %" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">User Logins</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userLogins}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* User List & System Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Users</h3>
          <div className="space-y-3">
            {[
              { name: "Alice Johnson", email: "alice@example.com", status: "Active" },
              { name: "Bob Smith", email: "bob@example.com", status: "Active" },
              { name: "Carol Davis", email: "carol@example.com", status: "Inactive" },
              { name: "David Wilson", email: "david@example.com", status: "Active" },
            ].map((u, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.email}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${u.status === "Active" ? "bg-green-500/10 text-green-700" : "bg-gray-500/10 text-gray-700"}`}
                >
                  {u.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">System Logs</h3>
          <div className="space-y-3">
            {[
              { event: "User login", user: "alice@example.com", time: "2 min ago" },
              { event: "Database backup", user: "System", time: "1 hour ago" },
              { event: "Security scan", user: "System", time: "3 hours ago" },
              { event: "User logout", user: "bob@example.com", time: "4 hours ago" },
            ].map((log, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium">{log.event}</p>
                  <p className="text-xs text-muted-foreground">{log.user}</p>
                </div>
                <span className="text-xs text-muted-foreground">{log.time}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
