"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Users,
  Download,
  FileText,
  BarChart,
  LogOut,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"

interface AppSidebarProps {
  userType: "student" | "teacher"
}

export function AppSidebar({ userType }: AppSidebarProps) {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  const studentMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/student",
      icon: LayoutDashboard,
    },
    {
      title: "Courses",
      href: "/dashboard/student/courses",
      icon: BookOpen,
    },
    {
      title: "AI Tutor",
      href: "/dashboard/student/ai-tutor",
      icon: MessageSquare,
    },
    {
      title: "Offline Content",
      href: "/dashboard/student/offline",
      icon: Download,
    },
    {
      title: "Quizzes",
      href: "/dashboard/student/quizzes",
      icon: FileText,
    },
    {
      title: "Progress",
      href: "/dashboard/student/progress",
      icon: BarChart,
    },
  ]

  const teacherMenuItems = [
    {
      title: "Dashboard",
      href: "/dashboard/teacher",
      icon: LayoutDashboard,
    },
    {
      title: "Courses",
      href: "/dashboard/teacher/courses",
      icon: BookOpen,
    },
    {
      title: "Students",
      href: "/dashboard/teacher/students",
      icon: Users,
    },
    {
      title: "Learning Hubs",
      href: "/dashboard/teacher/hubs",
      icon: GraduationCap,
    },
    {
      title: "Analytics",
      href: "/dashboard/teacher/analytics",
      icon: BarChart,
    },
    {
      title: "Content Manager",
      href: "/dashboard/teacher/content",
      icon: FileText,
    },
  ]

  const menuItems = userType === "student" ? studentMenuItems : teacherMenuItems

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              EduReach
            </span>
          </Link>
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === "/dashboard/settings"} tooltip="Settings">
                  <Link href="/dashboard/settings">
                    <Settings className="h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="px-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start px-2">
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <span className="truncate">
                  {user?.name || (userType === "student" ? "John Student" : "Jane Teacher")}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

