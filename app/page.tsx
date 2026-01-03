import { KanbanSidebar } from "@/components/kanban/sidebar"
import { KanbanBoard } from "@/components/kanban/board"
import { Star, Share2, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Layout } from "lucide-react"

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <KanbanSidebar />

      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="flex h-14 items-center justify-between border-b border-border/50 px-6 bg-background/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2.5 ml-8 md:ml-0">
            <Layout className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">Tasks Board</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground text-xs gap-1.5 rounded-lg hover:bg-accent/30"
            >
              Share
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-lg hover:bg-accent/30">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-lg hover:bg-accent/30">
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-lg hover:bg-accent/30">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Board Area */}
        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="px-12 pt-12 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-foreground flex items-center gap-3">
              <span className="text-3xl">🎯</span> Tasks Board
            </h1>
            <p className="mt-3 text-muted-foreground text-base max-w-2xl leading-relaxed">
              A custom workspace for tracking team projects, priorities, and daily progress.
            </p>
          </div>

          <div className="flex-1 relative">
            <KanbanBoard />
          </div>
        </div>
      </main>
    </div>
  )
}
