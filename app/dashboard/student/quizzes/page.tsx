"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle2, Clock, FileText, Trophy } from "lucide-react"

export default function QuizzesPage() {
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({})
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const { toast } = useToast()

  const startQuiz = (quiz: Quiz) => {
    setActiveQuiz(quiz)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
    setScore(0)
  }

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    })
  }

  const handleNextQuestion = () => {
    if (!activeQuiz) return

    if (currentQuestion < activeQuiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      let correctAnswers = 0
      activeQuiz.questions.forEach((question) => {
        if (selectedAnswers[question.id] === question.correctAnswer) {
          correctAnswers++
        }
      })

      const finalScore = Math.round((correctAnswers / activeQuiz.questions.length) * 100)
      setScore(finalScore)
      setQuizCompleted(true)

      toast({
        title: "Quiz Completed!",
        description: `You scored ${finalScore}% on ${activeQuiz.title}`,
      })
    }
  }

  const resetQuiz = () => {
    setActiveQuiz(null)
    setCurrentQuestion(0)
    setSelectedAnswers({})
    setQuizCompleted(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Quizzes</h2>
          <p className="text-muted-foreground">Test your knowledge with interactive quizzes</p>
        </div>
      </div>

      {activeQuiz ? (
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{activeQuiz.title}</CardTitle>
                <CardDescription>{activeQuiz.description}</CardDescription>
              </div>
              <Badge variant="outline" className="ml-2">
                {activeQuiz.category}
              </Badge>
            </div>
            {!quizCompleted && (
              <div className="mt-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Question {currentQuestion + 1} of {activeQuiz.questions.length}
                  </span>
                </div>
                <Progress value={((currentQuestion + 1) / activeQuiz.questions.length) * 100} className="h-2 mt-1" />
              </div>
            )}
          </CardHeader>
          <CardContent>
            {quizCompleted ? (
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center py-6">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <Trophy className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Quiz Completed!</h3>
                  <p className="text-muted-foreground">Your score:</p>
                  <div className="text-4xl font-bold mt-2">{score}%</div>

                  <div className="w-full max-w-xs mt-4">
                    <Progress value={score} className="h-3" />
                  </div>

                  <div className="mt-4 text-center">
                    {score >= 80 ? (
                      <p className="text-green-600 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 mr-1" /> Excellent work!
                      </p>
                    ) : score >= 60 ? (
                      <p className="text-amber-600">Good job! Keep practicing.</p>
                    ) : (
                      <p className="text-red-600">You might need more practice.</p>
                    )}
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Question Summary:</h4>
                  {activeQuiz.questions.map((question, index) => (
                    <div key={question.id} className="p-3 rounded-md bg-muted/50">
                      <p className="font-medium">
                        {index + 1}. {question.text}
                      </p>
                      <p className="text-sm mt-1">
                        Your answer:
                        <span
                          className={
                            selectedAnswers[question.id] === question.correctAnswer
                              ? "text-green-600 font-medium ml-1"
                              : "text-red-600 font-medium ml-1"
                          }
                        >
                          {question.options[selectedAnswers[question.id] || 0]}
                          {selectedAnswers[question.id] !== question.correctAnswer &&
                            ` (Correct: ${question.options[question.correctAnswer]})`}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 rounded-md bg-muted/50">
                  <p className="font-medium text-lg">{activeQuiz.questions[currentQuestion].text}</p>
                </div>

                <RadioGroup
                  value={selectedAnswers[activeQuiz.questions[currentQuestion].id]?.toString()}
                  onValueChange={(value) =>
                    handleAnswerSelect(activeQuiz.questions[currentQuestion].id, Number.parseInt(value))
                  }
                  className="space-y-3"
                >
                  {activeQuiz.questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2 rounded-md border p-3 hover:bg-muted/50">
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                      <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={resetQuiz}>
              {quizCompleted ? "Back to Quizzes" : "Cancel"}
            </Button>
            {!quizCompleted && (
              <Button
                onClick={handleNextQuestion}
                disabled={selectedAnswers[activeQuiz.questions[currentQuestion].id] === undefined}
              >
                {currentQuestion < activeQuiz.questions.length - 1 ? "Next Question" : "Finish Quiz"}
              </Button>
            )}
            {quizCompleted && <Button onClick={() => startQuiz(activeQuiz)}>Retry Quiz</Button>}
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="available">
          <TabsList>
            <TabsTrigger value="available">Available Quizzes</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {availableQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{quiz.title}</CardTitle>
                      <div className="rounded-full bg-primary/10 p-1">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{quiz.category}</Badge>
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {quiz.timeLimit} min
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{quiz.questions.length} questions</p>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => startQuiz(quiz)}>
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {completedQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>{quiz.title}</CardTitle>
                      <div className="rounded-full bg-green-100 p-1">
                        <Trophy className="h-5 w-5 text-green-600" />
                      </div>
                    </div>
                    <CardDescription>{quiz.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{quiz.category}</Badge>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        Score: {quiz.score}%
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Completed on {quiz.completedDate}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => startQuiz(quiz)}>
                      Retake Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

interface Quiz {
  id: string
  title: string
  description: string
  category: string
  timeLimit: number
  questions: Question[]
  score?: number
  completedDate?: string
}

const availableQuizzes: Quiz[] = [
  {
    id: "1",
    title: "Algebra Fundamentals",
    description: "Test your knowledge of basic algebraic concepts",
    category: "Mathematics",
    timeLimit: 15,
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
      {
        id: "1-3",
        text: "If f(x) = 3x - 2, what is f(4)?",
        options: ["8", "10", "12", "14"],
        correctAnswer: 1,
      },
      {
        id: "1-4",
        text: "Simplify the expression: 3(2x - 4) + 5",
        options: ["6x - 12 + 5", "6x - 7", "6x - 12", "6x + 5"],
        correctAnswer: 1,
      },
      {
        id: "1-5",
        text: "Solve for x: 5x - 3 = 2x + 9",
        options: ["x = 3", "x = 4", "x = 5", "x = 6"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "2",
    title: "Physics Concepts",
    description: "Test your understanding of basic physics principles",
    category: "Science",
    timeLimit: 20,
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
      {
        id: "2-3",
        text: "What is the formula for calculating work?",
        options: ["W = F × d", "W = m × a", "W = F / d", "W = m × g"],
        correctAnswer: 0,
      },
      {
        id: "2-4",
        text: "Which of the following is a vector quantity?",
        options: ["Mass", "Temperature", "Velocity", "Time"],
        correctAnswer: 2,
      },
      {
        id: "2-5",
        text: "What is the acceleration due to gravity on Earth (approximate value)?",
        options: ["5 m/s²", "8 m/s²", "9.8 m/s²", "12 m/s²"],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: "3",
    title: "Literary Analysis",
    description: "Test your understanding of literary elements and techniques",
    category: "Literature",
    timeLimit: 25,
    questions: [
      {
        id: "3-1",
        text: "What is the main purpose of foreshadowing in literature?",
        options: [
          "To confuse the reader",
          "To hint at events to come",
          "To describe the setting",
          "To develop character traits",
        ],
        correctAnswer: 1,
      },
      {
        id: "3-2",
        text: "Which literary device involves a contradiction of terms?",
        options: ["Metaphor", "Simile", "Oxymoron", "Alliteration"],
        correctAnswer: 2,
      },
      {
        id: "3-3",
        text: "What is the protagonist in a story?",
        options: ["The main setting", "The main character", "The main conflict", "The main antagonist"],
        correctAnswer: 1,
      },
      {
        id: "3-4",
        text: "Which of the following is NOT a type of narrative point of view?",
        options: ["First person", "Second person", "Third person limited", "Fourth person"],
        correctAnswer: 3,
      },
      {
        id: "3-5",
        text: "What is a sonnet?",
        options: [
          "A type of novel",
          "A 14-line poem with a specific rhyme scheme",
          "A dramatic monologue",
          "A type of play",
        ],
        correctAnswer: 1,
      },
    ],
  },
]

const completedQuizzes: Quiz[] = [
  {
    id: "4",
    title: "Basic Mathematics",
    description: "Test your knowledge of basic math concepts",
    category: "Mathematics",
    timeLimit: 10,
    score: 85,
    completedDate: "May 15, 2023",
    questions: [
      {
        id: "4-1",
        text: "What is 7 × 8?",
        options: ["54", "56", "64", "72"],
        correctAnswer: 1,
      },
      {
        id: "4-2",
        text: "What is the square root of 81?",
        options: ["7", "8", "9", "10"],
        correctAnswer: 2,
      },
      {
        id: "4-3",
        text: "What is 15% of 80?",
        options: ["8", "12", "15", "18"],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: "5",
    title: "Grammar Basics",
    description: "Test your understanding of English grammar",
    category: "English",
    timeLimit: 15,
    score: 70,
    completedDate: "June 2, 2023",
    questions: [
      {
        id: "5-1",
        text: "Which of the following is a proper noun?",
        options: ["City", "London", "Building", "River"],
        correctAnswer: 1,
      },
      {
        id: "5-2",
        text: "Which sentence uses the correct form of the verb?",
        options: [
          "They was going to the store.",
          "She were happy about the news.",
          "He is playing basketball.",
          "We is studying for the test.",
        ],
        correctAnswer: 2,
      },
      {
        id: "5-3",
        text: "Which word is an adverb?",
        options: ["Happy", "Quickly", "Beautiful", "Table"],
        correctAnswer: 1,
      },
    ],
  },
]

