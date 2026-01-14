import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const userCookie = request.cookies.get("authUser")?.value
  let user: { role: string } | null = null

  if (userCookie) {
    try {
      user = JSON.parse(userCookie)
    } catch {
      // Invalid cookie
    }
  }

  // Check if user data is in localStorage by reading from the request
  const pathname = request.nextUrl.pathname

  // Public routes that don't require authentication
  if (pathname === "/" || pathname === "/login") {
    return NextResponse.next()
  }

  // Protected routes - check role-based access
  if (pathname.startsWith("/user/")) {
    // For client-side auth, we'll handle this in the layout components
    return NextResponse.next()
  }

  if (pathname.startsWith("/admin/")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/super-admin/")) {
    return NextResponse.next()
  }

  // Default: allow request
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}
