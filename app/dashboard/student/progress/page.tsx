"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Calendar, Clock, Download, FileText, Trophy } from "lucide-react"

export default function ProgressPage() {
  const [timeframe, setTimeframe] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Learning Progress</h2>
          <p className="text-muted-foreground">Track your learning journey and achievements</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <Progress value={68} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/6</div>
            <Progress value={33} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">33% completion rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Performance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2 bg-green-500" />
            <p className="text-xs text-muted-foreground mt-2">Average score across all quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5h</div>
            <Progress value={82} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-2">82% of weekly goal</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Courses Progress</TabsTrigger>
          <TabsTrigger value="quizzes">Quiz Performance</TabsTrigger>
          <TabsTrigger value="activity">Activity Log</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion</CardTitle>
              <CardDescription>Your progress across all enrolled courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{course.title}</div>
                      <div className="text-sm text-muted-foreground">{course.module}</div>
                    </div>
                    <Badge variant={course.progress === 100 ? "success" : "outline"}>
                      {course.progress === 100 ? "Completed" : `${course.progress}%`}
                    </Badge>
                  </div>
                  <Progress
                    value={course.progress}
                    className={`h-2 ${
                      course.progress === 100 ? "bg-green-500" : course.progress >= 60 ? "bg-amber-500" : ""
                    }`}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quizzes" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Results</CardTitle>
              <CardDescription>Your performance on completed quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quizzes.map((quiz) => (
                  <div key={quiz.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{quiz.title}</div>
                        <div className="text-sm text-muted-foreground">{quiz.date}</div>
                      </div>
                      <Badge variant={quiz.score >= 80 ? "success" : quiz.score >= 60 ? "warning" : "destructive"}>
                        {quiz.score}%
                      </Badge>
                    </div>
                    <Progress
                      value={quiz.score}
                      className={`h-2 ${
                        quiz.score >= 80 ? "bg-green-500" : quiz.score >= 60 ? "bg-amber-500" : "bg-red-500"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your learning activities over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0">
                    <div className={`rounded-full p-2 ${getActivityIconBackground(activity.type)}`}>
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{activity.title}</div>
                      <div className="text-sm text-muted-foreground">{activity.description}</div>
                      <div className="text-xs text-muted-foreground mt-1">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions for activity icons
function getActivityIcon(type: string) {
  switch (type) {
    case "course":
      return <BookOpen className="h-4 w-4 text-white" />
    case "quiz":
      return <FileText className="h-4 w-4 text-white" />
    case "achievement":
      return <Trophy className="h-4 w-4 text-white" />
    default:
      return <Calendar className="h-4 w-4 text-white" />
  }
}

function getActivityIconBackground(type: string) {
  switch (type) {
    case "course":
      return "bg-blue-500"
    case "quiz":
      return "bg-purple-500"
    case "achievement":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

// Sample data
const courses = [
  {
    id: "1",
    title: "Mathematics - Algebra Fundamentals",
    module: "Completed all modules",
    progress: 100,
  },
  {
    id: "2",
    title: "Science - Physics Basics",
    module: "Module 2: Newton's Laws of Motion",
    progress: 42,
  },
  {
    id: "3",
    title: "English Literature",
    module: "Module 5: Shakespeare's Works",
    progress: 78,
  },
  {
    id: "4",
    title: "Introduction to Computer Science",
    module: "Module 1: Programming Basics",
    progress: 25,
  },
]

const quizzes = [
  {
    id: "1",
    title: "Algebra Quiz",
    date: "Completed on May 15, 2023",
    score: 85,
  },
  {
    id: "2",
    title: "Physics Concepts",
    date: "Completed on June 2, 2023",
    score: 70,
  },
  {
    id: "3",
    title: "Literary Analysis",
    date: "Completed on June 10, 2023",
    score: 90,
  },
  {
    id: "4",
    title: "Basic Mathematics",
    date: "Completed on April 20, 2023",
    score: 95,
  },
  {
    id: "5",
    title: "Grammar Basics",
    date: "Completed on May 5, 2023",
    score: 65,
  },
]

const activities = [
  {
    type: "course",
    title: "Completed a lesson",
    description: "Quadratic Equations in Mathematics - Algebra",
    time: "Today, 10:30 AM",
  },
  {
    type: "quiz",
    title: "Completed a quiz",
    description: "Scored 85% on Algebra Quiz",
    time: "Yesterday, 3:45 PM",
  },
  {
    type: "achievement",
    title: "Earned an achievement",
    description: "Perfect Score - Completed a quiz with 100% accuracy",
    time: "2 days ago, 5:20 PM",
  },
  {
    type: "course",
    title: "Started a new course",
    description: "Introduction to Computer Science",
    time: "3 days ago, 9:15 AM",
  },
  {
    type: "quiz",
    title: "Attempted a quiz",
    description: "Scored 70% on Physics Concepts",
    time: "1 week ago, 2:30 PM",
  },
]

// Custom Badge variants
Badge.defaultProps = {
  ...Badge.defaultProps,
  variants: {
    ...Badge.defaultProps?.variants,
    success: "bg-green-500 text-white hover:bg-green-600",
    warning: "bg-amber-500 text-white hover:bg-amber-600",
    destructive: "bg-red-500 text-white hover:bg-red-600",
  },
}

