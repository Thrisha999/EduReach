// This is a simple in-memory database for demonstration purposes
// In a real application, you would use IndexedDB for offline storage

interface Course {
  id: string
  title: string
  description: string
  modules: Module[]
}

interface Module {
  id: string
  title: string
  lessons: Lesson[]
}

interface Lesson {
  id: string
  title: string
  content: string
  type: "video" | "text" | "quiz"
  offlineAvailable: boolean
}

interface Quiz {
  id: string
  title: string
  questions: Question[]
}

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

// Sample data
const courses: Course[] = [
  {
    id: "1",
    title: "Mathematics - Algebra Fundamentals",
    description: "Learn the basics of algebra including equations, functions, and graphs.",
    modules: [
      {
        id: "1-1",
        title: "Introduction to Algebra",
        lessons: [
          {
            id: "1-1-1",
            title: "What is Algebra?",
            content:
              "Algebra is a branch of mathematics dealing with symbols and the rules for manipulating these symbols.",
            type: "text",
            offlineAvailable: true,
          },
          {
            id: "1-1-2",
            title: "Basic Algebraic Operations",
            content: "Learn about addition, subtraction, multiplication, and division in algebra.",
            type: "video",
            offlineAvailable: false,
          },
        ],
      },
      {
        id: "1-2",
        title: "Solving Equations",
        lessons: [
          {
            id: "1-2-1",
            title: "Linear Equations",
            content: "A linear equation is an equation that forms a straight line when plotted on a graph.",
            type: "text",
            offlineAvailable: true,
          },
          {
            id: "1-2-2",
            title: "Quadratic Equations",
            content: "A quadratic equation is a second-degree polynomial equation.",
            type: "video",
            offlineAvailable: true,
          },
        ],
      },
    ],
  },
  {
    id: "2",
    title: "Science - Physics Basics",
    description: "Understand the fundamental principles of physics including mechanics and energy.",
    modules: [
      {
        id: "2-1",
        title: "Mechanics",
        lessons: [
          {
            id: "2-1-1",
            title: "Newton's Laws of Motion",
            content:
              "Newton's laws of motion are three physical laws that describe the relationship between a body and the forces acting upon it.",
            type: "text",
            offlineAvailable: true,
          },
          {
            id: "2-1-2",
            title: "Force and Motion",
            content: "Learn about the relationship between force and motion.",
            type: "quiz",
            offlineAvailable: false,
          },
        ],
      },
    ],
  },
]

const quizzes: Quiz[] = [
  {
    id: "1",
    title: "Algebra Quiz",
    questions: [
      {
        id: "1-1",
        text: "What is the solution to the equation 2x + 5 = 13?",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correctAnswer: 1,
      },
      {
        id: "1-2",
        text: "Which of the following is a quadratic equation?",
        options: ["y = 2x + 3", "y = x²", "y = 3/x", "y = √x"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Physics Concepts",
    questions: [
      {
        id: "2-1",
        text: "Which of Newton's laws states that an object at rest stays at rest unless acted upon by an external force?",
        options: ["First Law", "Second Law", "Third Law", "Fourth Law"],
        correctAnswer: 0,
      },
      {
        id: "2-2",
        text: "What is the unit of force in the International System of Units (SI)?",
        options: ["Watt", "Joule", "Newton", "Pascal"],
        correctAnswer: 2,
      },
    ],
  },
]

// Simulated database functions
export async function getCourses(): Promise<Course[]> {
  return courses
}

export async function getCourse(id: string): Promise<Course | undefined> {
  return courses.find((course) => course.id === id)
}

export async function getQuizzes(): Promise<Quiz[]> {
  return quizzes
}

export async function getQuiz(id: string): Promise<Quiz | undefined> {
  return quizzes.find((quiz) => quiz.id === id)
}

// Offline storage simulation
export async function markContentAsOffline(lessonId: string): Promise<boolean> {
  // In a real app, this would store the content in IndexedDB
  console.log(`Marking lesson ${lessonId} as available offline`)
  return true
}

export async function getOfflineLessons(): Promise<Lesson[]> {
  // In a real app, this would retrieve content from IndexedDB
  const offlineLessons: Lesson[] = []

  courses.forEach((course) => {
    course.modules.forEach((module) => {
      module.lessons.forEach((lesson) => {
        if (lesson.offlineAvailable) {
          offlineLessons.push(lesson)
        }
      })
    })
  })

  return offlineLessons
}

