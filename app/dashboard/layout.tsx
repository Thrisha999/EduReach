"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { useAuth } from "@/components/auth-provider"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, isLoading } = useAuth()
  const router = useRouter()

  const userType = pathname.includes("/dashboard/teacher") ? "teacher" : "student"

  useEffect(() => {
    // Redirect if not authenticated
    if (!isLoading && !user) {
      router.push("/login")
    }

    // Redirect if user is on the wrong dashboard
    if (!isLoading && user) {
      if (user.role === "teacher" && pathname.startsWith("/dashboard/student")) {
        router.push("/dashboard/teacher")
      } else if (user.role === "student" && pathname.startsWith("/dashboard/teacher")) {
        router.push("/dashboard/student")
      }
    }
  }, [user, isLoading, pathname, router])

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!user) {
    return null // Will redirect in the useEffect
  }

  return (
    <SidebarProvider>
      <AppSidebar userType={userType} />
      <SidebarInset>
        <div className="flex min-h-screen flex-col">
          <main className="flex-1 p-4 md:p-6">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

