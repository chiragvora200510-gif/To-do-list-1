"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Target } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate login for preview purposes since no real auth is requested yet
    setTimeout(() => {
      setIsLoading(false)
      router.push("/")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 bg-background">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">
          {/* Logo Area */}
          <div className="flex flex-col items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg shadow-primary/20">
              <Target className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">TaskFlow</h2>
          </div>

          <Card className="border-0 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-[2rem] p-4">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription className="text-muted-foreground">
                Enter your details to access your workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      className="rounded-xl bg-muted/50 border-0 h-11 focus-visible:ring-offset-0"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs font-semibold text-primary hover:underline">
                        Forgot?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      className="rounded-xl bg-muted/50 border-0 h-11 focus-visible:ring-offset-0"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl font-bold bg-primary hover:bg-primary/90 shadow-md shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign in"}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  New here?{" "}
                  <Link href="#" className="font-bold text-foreground hover:underline">
                    Create account
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
