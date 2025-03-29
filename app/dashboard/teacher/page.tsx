import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { BarChart, BookOpen, FileText, Plus, Users } from "lucide-react"
import { ProgressNav } from "@/components/progress-nav"

export default function TeacherDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, Jane! Manage your courses and students.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/teacher/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/teacher/content">
              <FileText className="mr-2 h-4 w-4" />
              Manage Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="mb-6">
        <ProgressNav userType="teacher" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 pending approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hubs</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Across 3 regions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Completion</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="students">Recent Students</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="courses" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teacherCourses.map((course) => (
              <Card key={course.id}>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.students} students enrolled</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-4">{course.description}</div>
                  <div className="flex justify-between">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/teacher/courses/${course.id}`}>Manage</Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/teacher/courses/${course.id}/analytics`}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="students" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Student Activity</CardTitle>
              <CardDescription>Students who recently joined or completed courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentStudents.map((student) => (
                  <div key={student.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.course}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">{student.status}</p>
                      <Button size="sm" variant="ghost" asChild>
                        <Link href={`/dashboard/teacher/students/${student.id}`}>View</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Analytics</CardTitle>
              <CardDescription>Performance metrics for your courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">Analytics visualization would appear here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const teacherCourses = [
  {
    id: "1",
    title: "Mathematics - Algebra",
    students: 42,
    description: "Fundamental algebraic concepts including equations, functions, and graphs.",
  },
  {
    id: "2",
    title: "Science - Physics",
    students: 36,
    description: "Basic physics principles covering mechanics, energy, and simple machines.",
  },
  {
    id: "3",
    title: "English Literature",
    students: 28,
    description: "Analysis of classic literature works and writing techniques.",
  },
  {
    id: "4",
    title: "Computer Science",
    students: 22,
    description: "Introduction to programming concepts and computational thinking.",
  },
]

const recentStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    course: "Mathematics - Algebra",
    status: "Completed Module 3",
  },
  {
    id: "2",
    name: "Maria Garcia",
    course: "Science - Physics",
    status: "Joined 2 days ago",
  },
  {
    id: "3",
    name: "Raj Patel",
    course: "Computer Science",
    status: "Completed Quiz",
  },
  {
    id: "4",
    name: "Sarah Williams",
    course: "English Literature",
    status: "Joined 5 days ago",
  },
]

