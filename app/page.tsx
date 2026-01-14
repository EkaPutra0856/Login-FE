import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, ShieldCheck, Crown } from "lucide-react"

export const metadata = {
  title: "Role-Based Admin System",
  description: "Modern SaaS app with role-based access control",
}

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      {/* Navigation */}
      <nav className="border-b border-border/50 sticky top-0 z-40 bg-background/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            Admin<span className="text-primary">Hub</span>
          </div>
          <Link href="/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance">
          Role-Based Access Control
          <span className="block text-primary mt-2">Made Simple</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
          Manage your organization with three powerful roles: Users, Admins, and Super Admins. Each with tailored
          dashboards and permissions.
        </p>
        <Link href="/login">
          <Button size="lg" className="gap-2">
            Get Started <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Powerful Roles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* User Role */}
          <div className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
            <Users className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Regular User</h3>
            <p className="text-muted-foreground mb-4">
              Access your personal dashboard, manage your profile, and view activity summaries.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Personal Dashboard
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Profile Management
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Activity Tracking
              </li>
            </ul>
          </div>

          {/* Admin Role */}
          <div className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
            <ShieldCheck className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Admin IT</h3>
            <p className="text-muted-foreground mb-4">
              Monitor system health, manage users, and access comprehensive logs.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">✓</span> System Overview
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> User Management
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> System Logs
              </li>
            </ul>
          </div>

          {/* Super Admin Role */}
          <div className="border border-border rounded-lg p-8 hover:border-primary/50 transition-colors">
            <Crown className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Super Admin</h3>
            <p className="text-muted-foreground mb-4">
              Full system control with analytics, admin management, and role permissions.
            </p>
            <ul className="text-sm space-y-2">
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Full Analytics
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Admin Management
              </li>
              <li className="flex gap-2">
                <span className="text-primary">✓</span> Audit Logs
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <p className="text-lg text-muted-foreground mb-8">Choose your role and explore the system</p>
        <Link href="/login">
          <Button size="lg">Sign In Now</Button>
        </Link>
      </section>
    </main>
  )
}
