import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BarChart, Edit, ExternalLink, Plus, Users } from "lucide-react"

export default function TeacherCoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Manage your courses and create new learning materials</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/teacher/courses/new">
              <Plus className="mr-2 h-4 w-4" />
              Create Course
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Courses</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {course.students} students enrolled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/teacher/courses/${course.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Manage
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/teacher/courses/${course.id}/analytics`}>
                        <BarChart className="mr-2 h-4 w-4" />
                        Analytics
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" asChild>
                      <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="draft" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline">Draft</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/teacher/courses/${course.id}/edit`}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href={`/dashboard/teacher/courses/${course.id}/publish`}>Publish</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archivedCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="aspect-video w-full bg-muted relative">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/60 text-white hover:bg-black/70">
                      {course.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <Badge variant="outline" className="text-muted-foreground">
                      Archived
                    </Badge>
                    <span className="ml-2">
                      <Users className="h-4 w-4 inline mr-1" />
                      {course.students} students
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/teacher/courses/${course.id}`}>View</Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/teacher/courses/${course.id}/restore`}>Restore</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const activeCourses = [
  {
    id: "1",
    title: "Mathematics - Algebra",
    description: "Fundamental algebraic concepts including equations, functions, and graphs.",
    category: "Mathematics",
    students: 42,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/math/algebra",
  },
  {
    id: "2",
    title: "Science - Physics",
    description: "Basic physics principles covering mechanics, energy, and simple machines.",
    category: "Science",
    students: 36,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/science/physics",
  },
  {
    id: "3",
    title: "English Literature",
    description: "Analysis of classic literature works and writing techniques.",
    category: "Literature",
    students: 28,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.coursera.org/learn/english-literature",
  },
  {
    id: "4",
    title: "Computer Science",
    description: "Introduction to programming concepts and computational thinking.",
    category: "Computer Science",
    students: 22,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.edx.org/learn/computer-science",
  },
]

const draftCourses = [
  {
    id: "5",
    title: "Introduction to Chemistry",
    description: "Basic chemistry concepts including atoms, molecules, and chemical reactions.",
    category: "Science",
    image: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "6",
    title: "World Geography",
    description: "Exploration of countries, cultures, and geographical features around the world.",
    category: "Social Studies",
    image: "/placeholder.svg?height=180&width=320",
  },
]

const archivedCourses = [
  {
    id: "7",
    title: "Ancient History",
    description: "Study of ancient civilizations including Egypt, Greece, and Rome.",
    category: "History",
    students: 18,
    image: "/placeholder.svg?height=180&width=320",
  },
  {
    id: "8",
    title: "Basic Arithmetic",
    description: "Fundamental arithmetic operations for beginners.",
    category: "Mathematics",
    students: 15,
    image: "/placeholder.svg?height=180&width=320",
  },
]

