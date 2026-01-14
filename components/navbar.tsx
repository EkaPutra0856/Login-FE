"use client"
import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Menu, Bell, Settings, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

interface NavbarProps {
  title?: string
  onMenuClick: () => void
}

export function Navbar({ title, onMenuClick }: NavbarProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <nav className="sticky top-0 z-30 bg-background/95 border-b border-border/50 backdrop-blur">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Left: Menu & Title */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
            <Menu className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">{title ?? "Dashboard"}</h1>
        </div>

        {/* Right: Icons & User */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="w-5 h-5" />
          </Button>

          {/* User Avatar + Dropdown */}
          {user && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="w-9 h-9 rounded-full overflow-hidden border border-border/60 hover:border-primary transition"
              >
                <img
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </button>

              {open && (
                <div className="absolute right-0 mt-2 w-52 rounded-lg border border-border/60 bg-popover shadow-lg">
                  <div className="px-3 py-3 border-b border-border/50">
                    <p className="text-sm font-semibold text-foreground">{user.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    <p className="text-xs text-muted-foreground mt-1">Role: {user.role}</p>
                  </div>
                  <button
                    className="w-full px-3 py-2 flex items-center gap-2 text-sm text-destructive hover:bg-destructive/10"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
