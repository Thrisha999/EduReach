"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

interface User {
  email: string
  name: string
  role: "student" | "teacher"
}

interface AuthContextType {
  user: User | null
  login: (user: User) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("edureach_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // Redirect logic
    if (!isLoading) {
      // If user is not logged in and trying to access dashboard
      if (!user && pathname.startsWith("/dashboard")) {
        router.push("/login")
      }

      // If user is logged in and trying to access login/register
      if (user && (pathname === "/login" || pathname === "/register")) {
        const dashboardPath = user.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student"
        router.push(dashboardPath)
      }

      // Redirect to correct dashboard if user is on the wrong one
      if (user && pathname.startsWith("/dashboard")) {
        if (user.role === "teacher" && pathname.startsWith("/dashboard/student")) {
          router.push("/dashboard/teacher")
        } else if (user.role === "student" && pathname.startsWith("/dashboard/teacher")) {
          router.push("/dashboard/student")
        }
      }
    }
  }, [user, isLoading, pathname, router])

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("edureach_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("edureach_user")
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

