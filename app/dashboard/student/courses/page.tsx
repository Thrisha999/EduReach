import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { BookOpen, ExternalLink, Play, Star } from "lucide-react"

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">Browse and enroll in courses to continue your learning journey</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/student/courses/explore">
              <BookOpen className="mr-2 h-4 w-4" />
              Explore Courses
            </Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="my-courses">
        <TabsList>
          <TabsTrigger value="my-courses">My Courses</TabsTrigger>
          <TabsTrigger value="recommended">Recommended</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="my-courses" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {myCourses.map((course) => (
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
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/dashboard/student/courses/${course.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Continue
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View on Platform
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommended" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recommendedCourses.map((course) => (
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
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-muted text-muted" />
                    <span className="ml-1 text-muted-foreground">({course.ratings})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button size="sm" asChild>
                    <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                      Enroll Now
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/student/courses/preview/${course.id}`}>Preview</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularCourses.map((course) => (
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
                  <CardDescription>{course.instructor}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-1 text-sm">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="ml-1 text-muted-foreground">({course.ratings})</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button size="sm" asChild>
                    <a href={course.externalUrl} target="_blank" rel="noopener noreferrer">
                      Enroll Now
                    </a>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/dashboard/student/courses/preview/${course.id}`}>Preview</Link>
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

const myCourses = [
  {
    id: "1",
    title: "Mathematics - Algebra Fundamentals",
    instructor: "Dr. Sarah Johnson",
    category: "Mathematics",
    progress: 65,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/math/algebra",
  },
  {
    id: "2",
    title: "Science - Physics Basics",
    instructor: "Prof. Michael Chen",
    category: "Science",
    progress: 42,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/science/physics",
  },
  {
    id: "3",
    title: "English Literature",
    instructor: "Dr. Emily Williams",
    category: "Literature",
    progress: 78,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.coursera.org/learn/english-literature",
  },
]

const recommendedCourses = [
  {
    id: "4",
    title: "Introduction to Computer Science",
    instructor: "Prof. David Miller",
    category: "Computer Science",
    ratings: 4582,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.edx.org/learn/computer-science",
  },
  {
    id: "5",
    title: "Biology: Understanding Life",
    instructor: "Dr. Lisa Thompson",
    category: "Science",
    ratings: 3241,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/science/biology",
  },
  {
    id: "6",
    title: "World History: Ancient Civilizations",
    instructor: "Prof. Robert Anderson",
    category: "History",
    ratings: 2876,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.coursera.org/learn/world-history",
  },
]

const popularCourses = [
  {
    id: "7",
    title: "Introduction to Artificial Intelligence",
    instructor: "Dr. Alan Turing",
    category: "Computer Science",
    ratings: 9872,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.coursera.org/learn/ai-for-everyone",
  },
  {
    id: "8",
    title: "Creative Writing Workshop",
    instructor: "Prof. Jane Austen",
    category: "Literature",
    ratings: 7654,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.edx.org/learn/creative-writing",
  },
  {
    id: "9",
    title: "Environmental Science",
    instructor: "Dr. David Attenborough",
    category: "Science",
    ratings: 8521,
    image: "/placeholder.svg?height=180&width=320",
    externalUrl: "https://www.khanacademy.org/science/biology/ecology",
  },
]

