"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { WifiOff } from "lucide-react"

export default function OfflinePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-muted p-4">
              <WifiOff className="h-8 w-8 text-muted-foreground" />
            </div>
          </div>
          <CardTitle className="text-center text-2xl">You're Offline</CardTitle>
          <CardDescription className="text-center">
            Don't worry! You can still access your downloaded content.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            EduReach works offline for content you've downloaded. Check your offline content or try reconnecting to the
            internet.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild>
              <Link href="/dashboard/student/offline">View Offline Content</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

