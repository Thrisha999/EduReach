"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Check, Download, FileText, Trash, Video } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface OfflineContent {
  id: string
  title: string
  type: "video" | "document" | "quiz"
  course: string
  size: string
  icon: React.ElementType
  downloaded?: boolean
  downloadProgress?: number
}

export default function OfflineContent() {
  const [availableContent, setAvailableContent] = useState<OfflineContent[]>([
    {
      id: "1",
      title: "Algebra Fundamentals",
      type: "video",
      course: "Mathematics",
      size: "45 MB",
      icon: Video,
    },
    {
      id: "2",
      title: "Newton's Laws of Motion",
      type: "document",
      course: "Science",
      size: "12 MB",
      icon: FileText,
    },
    {
      id: "3",
      title: "Literary Analysis Techniques",
      type: "document",
      course: "English Literature",
      size: "8 MB",
      icon: FileText,
    },
    {
      id: "4",
      title: "Physics Concepts Quiz",
      type: "quiz",
      course: "Science",
      size: "2 MB",
      icon: FileText,
    },
  ])

  const [downloadedContent, setDownloadedContent] = useState<OfflineContent[]>([
    {
      id: "5",
      title: "Introduction to Quadratic Equations",
      type: "video",
      course: "Mathematics",
      size: "38 MB",
      icon: Video,
      downloaded: true,
    },
    {
      id: "6",
      title: "Shakespeare's Macbeth Analysis",
      type: "document",
      course: "English Literature",
      size: "10 MB",
      icon: FileText,
      downloaded: true,
    },
  ])

  const [downloadingContent, setDownloadingContent] = useState<OfflineContent[]>([])

  const startDownload = (content: OfflineContent) => {
    // Remove from available content
    setAvailableContent(availableContent.filter((c) => c.id !== content.id))

    // Add to downloading content with progress
    setDownloadingContent([
      ...downloadingContent,
      {
        ...content,
        downloadProgress: 0,
      },
    ])

    // Simulate download progress
    const interval = setInterval(() => {
      setDownloadingContent((prev) => {
        const updated = prev.map((c) => {
          if (c.id === content.id) {
            const newProgress = (c.downloadProgress || 0) + 10

            // If download complete
            if (newProgress >= 100) {
              clearInterval(interval)

              // Move to downloaded content
              setDownloadedContent((prev) => [
                ...prev,
                {
                  ...c,
                  downloaded: true,
                },
              ])

              // Remove from downloading
              return { ...c, downloadProgress: 100 }
            }

            return { ...c, downloadProgress: newProgress }
          }
          return c
        })
        return updated
      })
    }, 500)
  }

  const deleteContent = (content: OfflineContent) => {
    // Remove from downloaded content
    setDownloadedContent(downloadedContent.filter((c) => c.id !== content.id))

    // Add back to available content
    setAvailableContent([
      ...availableContent,
      {
        ...content,
        downloaded: false,
        downloadProgress: undefined,
      },
    ])
  }

  const cancelDownload = (content: OfflineContent) => {
    // Remove from downloading content
    setDownloadingContent(downloadingContent.filter((c) => c.id !== content.id))

    // Add back to available content
    setAvailableContent([
      ...availableContent,
      {
        ...content,
        downloadProgress: undefined,
      },
    ])
  }

  const getStorageUsed = () => {
    // Calculate total size (this is just a simulation)
    return 48
  }

  const getTotalStorage = () => {
    // Total available storage (this is just a simulation)
    return 100
  }

  return (
    <div className="container mx-auto max-w-4xl">
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Offline Content</h2>
          <p className="text-muted-foreground">Download lessons and quizzes for offline access</p>
        </div>

        <Alert>
          <FileText className="h-4 w-4" />
          <AlertTitle>Offline Mode Available</AlertTitle>
          <AlertDescription>
            Downloaded content will be available even when you don't have an internet connection.
          </AlertDescription>
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>
              {getStorageUsed()} MB used of {getTotalStorage()} MB
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={(getStorageUsed() / getTotalStorage()) * 100} className="h-2" />
          </CardContent>
        </Card>

        <Tabs defaultValue="available">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="downloading">Downloading</TabsTrigger>
            <TabsTrigger value="downloaded">Downloaded</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4 mt-4">
            {availableContent.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No content available for download</div>
            ) : (
              availableContent.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <content.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{content.course}</span>
                            <span>•</span>
                            <span>{content.size}</span>
                            <Badge variant="outline" className="ml-1">
                              {content.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" onClick={() => startDownload(content)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="downloading" className="space-y-4 mt-4">
            {downloadingContent.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No downloads in progress</div>
            ) : (
              downloadingContent.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <content.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <p className="font-medium">{content.title}</p>
                            <span className="text-xs font-medium">{content.downloadProgress}%</span>
                          </div>
                          <Progress value={content.downloadProgress} className="h-2 mt-2" />
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{content.course}</span>
                            <span>•</span>
                            <span>{content.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="destructive" onClick={() => cancelDownload(content)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="downloaded" className="space-y-4 mt-4">
            {downloadedContent.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">No downloaded content</div>
            ) : (
              downloadedContent.map((content) => (
                <Card key={content.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                          <content.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{content.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{content.course}</span>
                            <span>•</span>
                            <span>{content.size}</span>
                            <Badge variant="outline" className="ml-1 bg-green-50 text-green-700 border-green-200">
                              <Check className="mr-1 h-3 w-3" /> Available Offline
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" onClick={() => deleteContent(content)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

