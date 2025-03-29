import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Clock, Download, MessageSquare, Trophy } from "lucide-react"
import { ProgressNav } from "@/components/progress-nav"

export default function StudentDashboard() {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <ProgressNav userType="student" />
      </div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Student Dashboard</h2>
          <p className="text-muted-foreground">Welcome back, John! Continue your learning journey.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/student/ai-tutor">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ask AI Tutor
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/dashboard/student/offline">
              <Download className="mr-2 h-4 w-4" />
              Manage Offline Content
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Enrolled</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">2 in progress, 2 completed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground">+2.5 hours this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quizzes Completed</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Average score: 85%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Offline Content</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Lessons available offline</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Continue Learning</CardTitle>
            <CardDescription>Pick up where you left off</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10">
                  <course.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{course.title}</p>
                    <span className="text-xs text-muted-foreground">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">{course.module}</p>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/dashboard/student/courses/${course.id}`}>Continue</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Quizzes</CardTitle>
            <CardDescription>Prepare for your assessments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {quizzes.map((quiz) => (
              <div key={quiz.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                    <quiz.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{quiz.title}</p>
                    <p className="text-xs text-muted-foreground">{quiz.course}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className="text-xs text-muted-foreground">{quiz.date}</p>
                  <Button size="sm" variant="outline" asChild>
                    <Link href={`/dashboard/student/quizzes/${quiz.id}`}>Start</Link>
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const courses = [
  {
    id: "1",
    title: "Mathematics - Algebra Fundamentals",
    progress: 65,
    module: "Module 4: Quadratic Equations",
    icon: BookOpen,
  },
  {
    id: "2",
    title: "Science - Physics Basics",
    progress: 42,
    module: "Module 2: Newton's Laws of Motion",
    icon: BookOpen,
  },
  {
    id: "3",
    title: "English Literature",
    progress: 78,
    module: "Module 5: Shakespeare's Works",
    icon: BookOpen,
  },
]

const quizzes = [
  {
    id: "1",
    title: "Algebra Quiz",
    course: "Mathematics",
    date: "Tomorrow",
    icon: Trophy,
  },
  {
    id: "2",
    title: "Physics Concepts",
    course: "Science",
    date: "In 3 days",
    icon: Trophy,
  },
  {
    id: "3",
    title: "Literary Analysis",
    course: "English Literature",
    date: "In 5 days",
    icon: Trophy,
  },
]

