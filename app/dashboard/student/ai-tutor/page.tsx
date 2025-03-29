"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bot, Send, User } from "lucide-react"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI tutor. How can I help you with your studies today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message to the chat
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In a real implementation, this would use the AI SDK to generate a response
      // For demo purposes, we'll simulate a response
      const prompt = `You are an educational AI tutor helping a student. 
      The student says: "${input}"
      
      Provide a helpful, educational response that explains concepts clearly and encourages further learning.`

      // This is a placeholder for the actual AI SDK implementation
      // In a production app, you would use:
      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
        system:
          "You are an educational AI tutor specialized in helping students understand complex concepts. Be concise, clear, and encouraging.",
      })

      const aiMessage: Message = { role: "assistant", content: text }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error generating AI response:", error)
      const errorMessage: Message = {
        role: "assistant",
        content: "I'm sorry, I encountered an error. Please try again later.",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">AI Tutor</h2>
          <p className="text-muted-foreground">Ask questions and get personalized help with your studies</p>
        </div>

        <Card className="border-2">
          <CardHeader>
            <CardTitle>Your Personal AI Tutor</CardTitle>
            <CardDescription>Ask any question about your coursework and get instant help</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[400px] overflow-y-auto p-4 rounded-md bg-muted/50">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar className="h-8 w-8">
                      {message.role === "user" ? (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                          <AvatarFallback>
                            <User className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      ) : (
                        <>
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="AI Tutor" />
                          <AvatarFallback>
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </>
                      )}
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 max-w-[80%]">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="rounded-lg p-3 bg-secondary text-secondary-foreground">
                      <p className="text-sm">Thinking...</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSubmit} className="flex w-full gap-2">
              <Textarea
                placeholder="Ask your question here..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="min-h-10 flex-1 resize-none"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Popular Topics</CardTitle>
            <CardDescription>Quick access to common subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["Algebra", "Physics", "Chemistry", "Literature", "History", "Biology", "Computer Science"].map(
                (topic) => (
                  <Button
                    key={topic}
                    variant="outline"
                    onClick={() => setInput(`Help me understand ${topic} concepts`)}
                  >
                    {topic}
                  </Button>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

