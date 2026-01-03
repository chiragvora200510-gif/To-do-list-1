"use client"

import { X, Paperclip, MessageSquare, Plus, Send, Clock, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

interface TaskDetailProps {
  task: {
    id: string
    title: string
    tags: string[]
    priority: string
    dueDate?: string
  }
  onClose: () => void
}

export function TaskDetail({ task, onClose }: TaskDetailProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="absolute inset-0 bg-foreground/20 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-card rounded-[2.5rem] shadow-[0_32px_64px_rgba(0,0,0,0.12)] flex flex-col">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-card/80 backdrop-blur-sm border-b border-border/50">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="rounded-full px-3 py-1 font-bold border-0 bg-primary/10 text-primary">
              {task.priority} Priority
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Clock className="h-3.5 w-3.5" />
              Created 2h ago
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-muted/80">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-8 space-y-8">
          {/* Title and Tags */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">{task.title}</h2>
            <div className="flex flex-wrap gap-2">
              {task.tags.map((tag) => (
                <Badge
                  key={tag}
                  className="bg-secondary/60 text-secondary-foreground hover:bg-secondary/80 rounded-xl px-4 py-1.5 font-bold"
                >
                  {tag}
                </Badge>
              ))}
              <Button variant="ghost" size="sm" className="rounded-xl h-8 gap-1.5 text-muted-foreground">
                <Plus className="h-3.5 w-3.5" />
                Add Tag
              </Button>
            </div>
          </div>

          {/* Collaborative Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Assignees</h4>
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-9 w-9 border-2 border-background shadow-sm">
                  <AvatarFallback className="bg-accent/50 text-accent-foreground font-bold text-xs">AS</AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full border-2 border-dashed border-muted-foreground/30 text-muted-foreground"
                >
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Due Date</h4>
              <div className="text-foreground font-semibold flex items-center gap-2">
                {task.dueDate || "Not set"}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs font-bold text-primary hover:bg-primary/10 rounded-lg"
                >
                  Change
                </Button>
              </div>
            </div>
          </div>

          <Separator className="bg-border/50" />

          {/* Attachments */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                <Paperclip className="h-4 w-4" />
                Attachments
              </h4>
              <Button variant="ghost" size="sm" className="text-primary font-bold gap-2 hover:bg-primary/10 rounded-xl">
                <Plus className="h-4 w-4" />
                Upload
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/20 group hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center shadow-sm">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">project-requirements.pdf</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">2.4 MB • PDF</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/20 group hover:bg-muted/50 transition-colors cursor-pointer">
                <div className="h-10 w-10 rounded-xl bg-card flex items-center justify-center shadow-sm">
                  <Image className="h-5 w-5 text-accent-foreground" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">prototype-v2-mockup.png</p>
                  <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">
                    4.1 MB • Image
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Collaboration / Comments */}
          <div className="space-y-6">
            <h4 className="text-sm font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Activity & Comments
            </h4>

            <div className="space-y-5">
              <div className="flex gap-4">
                <Avatar className="h-8 w-8 mt-1">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">John Doe</span>
                    <span className="text-[10px] text-muted-foreground font-medium">15m ago</span>
                  </div>
                  <div className="bg-muted/50 p-3.5 rounded-2xl rounded-tl-none text-sm leading-relaxed">
                    I've updated the design system tokens to match the Soft UI brief. Take a look at the attached
                    mockup!
                  </div>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="flex gap-3 items-center bg-muted/30 p-2 rounded-2xl border border-border/20 focus-within:ring-2 ring-primary/20 transition-all">
              <Input
                placeholder="Write a comment..."
                className="border-0 bg-transparent focus-visible:ring-0 shadow-none h-10 font-medium"
              />
              <Button
                size="icon"
                className="rounded-xl h-10 w-10 bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Simple Helper Components for the example
function FileText({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  )
}

function Image({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <circle cx="9" cy="9" r="2" />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}
