"use client"

import { useAuth } from "@/lib/auth-context"
import { Card } from "@/components/ui/card"
import { BarChart3, Clock, Activity, TrendingUp } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function UserDashboard() {
  const { user } = useAuth()

  const activityData = [
    { name: "Mon", value: 40 },
    { name: "Tue", value: 30 },
    { name: "Wed", value: 20 },
    { name: "Thu", value: 27 },
    { name: "Fri", value: 18 },
    { name: "Sat", value: 23 },
    { name: "Sun", value: 34 },
  ]

  const statsData = [
    { name: "Active", value: 65, fill: "#3b82f6" },
    { name: "Inactive", value: 35, fill: "#e5e7eb" },
  ]

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-muted-foreground">Here's an overview of your activity</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Activity</p>
              <p className="text-2xl font-bold">247</p>
            </div>
            <Activity className="w-10 h-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">This Month</p>
              <p className="text-2xl font-bold">64</p>
            </div>
            <TrendingUp className="w-10 h-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Last 7 Days</p>
              <p className="text-2xl font-bold">192</p>
            </div>
            <Clock className="w-10 h-10 text-primary/20" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Avg. per Day</p>
              <p className="text-2xl font-bold">27</p>
            </div>
            <BarChart3 className="w-10 h-10 text-primary/20" />
          </div>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <h3 className="font-semibold mb-6">Activity Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-6">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={statsData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value">
                {statsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="mt-6 p-6">
        <h3 className="font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { action: "Logged in", time: "2 hours ago" },
            { action: "Updated profile", time: "1 day ago" },
            { action: "Downloaded report", time: "3 days ago" },
            { action: "System notification", time: "1 week ago" },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <span className="text-sm">{activity.action}</span>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
