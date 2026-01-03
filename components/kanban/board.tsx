"use client"

import { useState } from "react"
import { Plus, MoreHorizontal, GripVertical, Filter, Search } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { TaskDetail } from "./task-detail"

interface Task {
  id: string
  title: string
  tags: string[]
  priority: "Low" | "Medium" | "High"
  dueDate?: string
}

interface Column {
  id: string
  title: string
  tasks: Task[]
}

const initialData: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Design system updates", tags: ["Design"], priority: "High", dueDate: "Oct 12" },
      { id: "2", title: "User interview synthesis", tags: ["Research"], priority: "Medium" },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [{ id: "3", title: "Drafting Q4 roadmap", tags: ["Planning"], priority: "High" }],
  },
  {
    id: "review",
    title: "Review",
    tasks: [{ id: "4", title: "Landing page copy", tags: ["Marketing"], priority: "Low", dueDate: "Oct 15" }],
  },
  {
    id: "done",
    title: "Done",
    tasks: [{ id: "5", title: "Mobile app prototype", tags: ["Design"], priority: "Medium" }],
  },
]

export function KanbanBoard() {
  const [columns] = useState<Column[]>(initialData)
  const [searchQuery, setSearchQuery] = useState("")
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const filteredColumns = columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter((task) => {
      const matchesSearch =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      const matchesPriority = !priorityFilter || task.priority === priorityFilter
      return matchesSearch && matchesPriority
    }),
  }))

  return (
    <div className="flex flex-col h-full">
      {selectedTask && <TaskDetail task={selectedTask} onClose={() => setSelectedTask(null)} />}

      <div className="px-12 py-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks or tags..."
            className="pl-9 rounded-xl bg-muted/50 border-0 h-10 focus-visible:ring-offset-0"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-10 px-3 rounded-xl gap-2 font-semibold hover:bg-accent/30">
              <Filter className="h-4 w-4" />
              {priorityFilter ? `Priority: ${priorityFilter}` : "Filter"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 rounded-2xl p-2 border-0 shadow-xl bg-background/95 backdrop-blur-sm"
          >
            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground px-2 py-1.5">
              PRIORITY
            </DropdownMenuLabel>
            <DropdownMenuItem className="rounded-xl cursor-pointer" onClick={() => setPriorityFilter(null)}>
              All Tasks
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-muted/50 mx-1" />
            <DropdownMenuItem
              className="rounded-xl cursor-pointer text-red-500 font-semibold"
              onClick={() => setPriorityFilter("High")}
            >
              High Priority
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl cursor-pointer text-amber-500 font-semibold"
              onClick={() => setPriorityFilter("Medium")}
            >
              Medium Priority
            </DropdownMenuItem>
            <DropdownMenuItem
              className="rounded-xl cursor-pointer text-blue-500 font-semibold"
              onClick={() => setPriorityFilter("Low")}
            >
              Low Priority
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex h-full gap-6 overflow-x-auto p-6 scrollbar-hide">
        {filteredColumns.map((column) => (
          <div key={column.id} className="flex min-w-[300px] flex-col gap-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-wide text-foreground/80">{column.title}</span>
                <span className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  {column.tasks.length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-accent/30 rounded-xl"
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:bg-accent/30 rounded-xl"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {column.tasks.map((task) => (
                <Card
                  key={task.id}
                  onClick={() => setSelectedTask(task)}
                  className="group relative cursor-pointer border-0 bg-card p-5 rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.04),0_1px_2px_rgba(0,0,0,0.06)] transition-all hover:shadow-[0_8px_16px_rgba(0,0,0,0.08),0_2px_4px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <div className="absolute top-4 right-3 opacity-0 transition-opacity group-hover:opacity-100">
                    <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex flex-wrap gap-2">
                      {task.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-secondary/60 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80 rounded-lg px-2.5 py-1"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <h4 className="text-[15px] font-semibold leading-snug text-foreground">{task.title}</h4>

                    {(task.dueDate || task.priority) && (
                      <div className="flex items-center justify-between">
                        <div className="text-xs text-muted-foreground font-medium">
                          {task.dueDate && <span>{task.dueDate}</span>}
                        </div>
                        <Badge
                          variant="outline"
                          className={`text-xs border-0 px-2 py-0.5 rounded-full font-semibold ${
                            task.priority === "High"
                              ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                              : task.priority === "Medium"
                                ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                                : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                          }`}
                        >
                          {task.priority}
                        </Badge>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              <Button
                variant="ghost"
                className="mt-1 h-10 w-full justify-start gap-2 px-3 rounded-xl text-muted-foreground hover:bg-accent/30 hover:text-foreground"
              >
                <Plus className="h-4 w-4" />
                <span className="text-sm font-medium">New task</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
