"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, FileText, GraduationCap, Trophy } from "lucide-react"

interface ProgressItem {
  id: string
  name: string
  progress: number
  category: string
}

interface ProgressNavProps {
  userType: "student" | "teacher"
}

export function ProgressNav({ userType }: ProgressNavProps) {
  const [activeTab, setActiveTab] = useState("overall")

  // Sample data - in a real app, this would come from an API
  const studentProgress: Record<string, ProgressItem[]> = {
    courses: [
      { id: "1", name: "Mathematics - Algebra", progress: 65, category: "Mathematics" },
      { id: "2", name: "Science - Physics", progress: 42, category: "Science" },
      { id: "3", name: "English Literature", progress: 78, category: "Literature" },
    ],
    quizzes: [
      { id: "1", name: "Algebra Quiz", progress: 85, category: "Mathematics" },
      { id: "2", name: "Physics Concepts", progress: 70, category: "Science" },
      { id: "3", name: "Literary Analysis", progress: 90, category: "Literature" },
    ],
    assignments: [
      { id: "1", name: "Quadratic Equations", progress: 100, category: "Mathematics" },
      { id: "2", name: "Newton's Laws Report", progress: 60, category: "Science" },
      { id: "3", name: "Shakespeare Essay", progress: 45, category: "Literature" },
    ],
  }

  const teacherProgress: Record<string, ProgressItem[]> = {
    courses: [
      { id: "1", name: "Mathematics - Algebra", progress: 92, category: "Mathematics" },
      { id: "2", name: "Science - Physics", progress: 78, category: "Science" },
      { id: "3", name: "English Literature", progress: 85, category: "Literature" },
      { id: "4", name: "Computer Science", progress: 65, category: "Computer Science" },
    ],
    students: [
      { id: "1", name: "Class 9A", progress: 75, category: "Grade 9" },
      { id: "2", name: "Class 10B", progress: 82, category: "Grade 10" },
      { id: "3", name: "Class 11C", progress: 68, category: "Grade 11" },
    ],
    content: [
      { id: "1", name: "Lesson Plans", progress: 90, category: "Planning" },
      { id: "2", name: "Assessments", progress: 85, category: "Evaluation" },
      { id: "3", name: "Learning Materials", progress: 70, category: "Resources" },
    ],
  }

  const progressData = userType === "student" ? studentProgress : teacherProgress

  // Calculate overall progress
  const calculateOverall = () => {
    let total = 0
    let count = 0

    Object.values(progressData).forEach((category) => {
      category.forEach((item) => {
        total += item.progress
        count++
      })
    })

    return count > 0 ? Math.round(total / count) : 0
  }

  const overallProgress = calculateOverall()

  // Get progress color based on percentage
  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 60) return "bg-amber-500"
    return "bg-red-500"
  }

  const getTabItems = () => {
    if (userType === "student") {
      return [
        { id: "overall", label: "Overall", icon: <GraduationCap className="h-4 w-4" /> },
        { id: "courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
        { id: "quizzes", label: "Quizzes", icon: <FileText className="h-4 w-4" /> },
        { id: "assignments", label: "Assignments", icon: <Trophy className="h-4 w-4" /> },
      ]
    } else {
      return [
        { id: "overall", label: "Overall", icon: <GraduationCap className="h-4 w-4" /> },
        { id: "courses", label: "Courses", icon: <BookOpen className="h-4 w-4" /> },
        { id: "students", label: "Students", icon: <FileText className="h-4 w-4" /> },
        { id: "content", label: "Content", icon: <Trophy className="h-4 w-4" /> },
      ]
    }
  }

  return (
    <Card className="border-none bg-background/60 shadow-none">
      <CardContent className="p-0">
        <div className="mb-4">
          <h3 className="text-lg font-medium">Progress Overview</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm font-medium">{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
          </div>
        </div>

        <Tabs defaultValue="overall" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            {getTabItems().map((tab) => (
              <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overall" className="mt-4 space-y-4">
            <div className="space-y-3">
              {Object.entries(progressData).map(([category, items]) => {
                const categoryAvg = Math.round(items.reduce((sum, item) => sum + item.progress, 0) / items.length)
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium capitalize">{category}</span>
                      <span className="text-sm font-medium">{categoryAvg}%</span>
                    </div>
                    <Progress value={categoryAvg} className={`h-2 ${getProgressColor(categoryAvg)}`} />
                  </div>
                )
              })}
            </div>
          </TabsContent>

          {Object.entries(progressData).map(([category, items]) => (
            <TabsContent key={category} value={category} className="mt-4 space-y-3">
              {items.map((item) => (
                <div key={item.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{item.name}</span>
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                    </div>
                    <span className="text-sm font-medium">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className={`h-2 ${getProgressColor(item.progress)}`} />
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

