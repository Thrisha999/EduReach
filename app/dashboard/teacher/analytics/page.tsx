"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BarChart, BookOpen, Download, FileText, TrendingUp, Users } from "lucide-react"

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("month")
  const [courseFilter, setCourseFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Monitor student performance and course engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <div className="flex items-center mt-1">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-xs text-green-500">+12 from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Course Completion</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <Progress value={72} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Average across all courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quiz Performance</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <Progress value={78} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Average score across all quizzes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <Progress value={85} className="h-2 mt-2" />
            <p className="text-xs text-muted-foreground mt-1">Based on activity and participation</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>Student progress across different courses</CardDescription>
              </div>
              <Select value={courseFilter} onValueChange={setCourseFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="science">Science</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="cs">Computer Science</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border rounded-md">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground">Course performance chart would appear here</p>
                <p className="text-xs text-muted-foreground mt-1">Showing data for {timeframe} period</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList>
          <TabsTrigger value="courses">Course Analytics</TabsTrigger>
          <TabsTrigger value="students">Student Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Course Completion Rates</CardTitle>
              <CardDescription>Progress across all active courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-sm text-muted-foreground">{course.students} students enrolled</div>
                      </div>
                      <div className="text-sm font-medium">{course.completion}%</div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-full">
                        <Progress value={course.completion} className="h-2" />
                      </div>
                      <div className="flex gap-2 text-xs">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
                          <span>Completed</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-amber-500 mr-1"></div>
                          <span>In Progress</span>
                        </div>
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-red-500 mr-1"></div>
                          <span>Not Started</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="students" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Students</CardTitle>
              <CardDescription>Students with highest achievement across courses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-sm text-muted-foreground">{student.courses} courses</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-medium">{student.avgScore}%</div>
                      <Progress value={student.avgScore} className="h-2 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Metrics</CardTitle>
              <CardDescription>Student activity and participation data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {engagementMetrics.map((metric) => (
                  <div key={metric.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{metric.name}</div>
                      <div className="text-sm font-medium">{metric.value}</div>
                    </div>
                    <Progress value={metric.percentage} className="h-2" />
                    <div className="text-xs text-muted-foreground">{metric.description}</div>
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

// Sample data
const courses = [
  {
    id: "1",
    title: "Mathematics - Algebra",
    students: 42,
    completion: 85,
  },
  {
    id: "2",
    title: "Science - Physics",
    students: 36,
    completion: 72,
  },
  {
    id: "3",
    title: "English Literature",
    students: 28,
    completion: 68,
  },
  {
    id: "4",
    title: "Computer Science",
    students: 22,
    completion: 60,
  },
]

const topStudents = [
  {
    id: "1",
    name: "Alex Johnson",
    courses: 4,
    avgScore: 95,
  },
  {
    id: "2",
    name: "Maria Garcia",
    courses: 3,
    avgScore: 92,
  },
  {
    id: "3",
    name: "Raj Patel",
    courses: 4,
    avgScore: 90,
  },
  {
    id: "4",
    name: "Sarah Williams",
    courses: 3,
    avgScore: 88,
  },
  {
    id: "5",
    name: "David Chen",
    courses: 4,
    avgScore: 87,
  },
]

const engagementMetrics = [
  {
    id: "1",
    name: "Course Participation",
    value: "85%",
    percentage: 85,
    description: "Percentage of students actively participating in course activities",
  },
  {
    id: "2",
    name: "Quiz Completion",
    value: "92%",
    percentage: 92,
    description: "Percentage of assigned quizzes completed by students",
  },
  {
    id: "3",
    name: "Discussion Activity",
    value: "68%",
    percentage: 68,
    description: "Percentage of students participating in course discussions",
  },
  {
    id: "4",
    name: "Content Download",
    value: "78%",
    percentage: 78,
    description: "Percentage of students downloading offline content",
  },
]

