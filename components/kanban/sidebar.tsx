"use client"

import type React from "react"
import { Search, Clock, Settings, Plus, ChevronDown, Layout, Target, Users, FileText, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { useMobile } from "@/hooks/use-mobile"

export function KanbanSidebar() {
  const isMobile = useMobile()
  const [isOpen, setIsOpen] = useState(!isMobile)

  useEffect(() => {
    setIsOpen(!isMobile)
  }, [isMobile])

  if (isMobile && !isOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-2.5 left-4 z-50 h-9 w-9 bg-background/80 backdrop-blur-sm shadow-sm rounded-xl border border-border/50"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-[2px] z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
        flex h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar/50 backdrop-blur-sm
        ${isMobile ? "fixed left-0 top-0 z-50 shadow-2xl transition-transform duration-300" : "relative"}
        ${isMobile && !isOpen ? "-translate-x-full" : "translate-x-0"}
      `}
      >
        {/* Workspace Header */}
        <div className="flex h-14 items-center gap-2.5 px-4 mx-2 mt-2 rounded-xl hover:bg-sidebar-accent transition-colors cursor-pointer group">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-xs font-bold text-primary-foreground shadow-sm group-hover:scale-105 transition-transform">
            TC
          </div>
          <span className="text-sm font-semibold truncate">Tech Team</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground ml-auto" />
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 ml-1"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="flex flex-col gap-1 px-2 py-4">
          <SidebarItem icon={<Search className="h-4 w-4" />} label="Search" shortcut="⌘K" />
          <SidebarItem icon={<Clock className="h-4 w-4" />} label="Updates" />
          <SidebarItem icon={<Settings className="h-4 w-4" />} label="Settings" />
        </div>

        <div className="flex-1 px-2 py-4 overflow-y-auto">
          <p className="px-3 py-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">Workspace</p>
          <div className="flex flex-col gap-1 mt-2">
            <SidebarItem icon={<Layout className="h-4 w-4" />} label="Tasks Board" active />
            <SidebarItem icon={<Target className="h-4 w-4" />} label="Goals" />
            <SidebarItem icon={<Users className="h-4 w-4" />} label="Team Directory" />
            <SidebarItem icon={<FileText className="h-4 w-4" />} label="Documentation" />
          </div>
        </div>

        <div className="p-3 border-t border-sidebar-border">
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 h-9 rounded-xl text-muted-foreground font-medium hover:bg-sidebar-accent hover:text-foreground"
          >
            <Plus className="h-4 w-4" />
            New Page
          </Button>
        </div>
      </aside>
    </>
  )
}

function SidebarItem({
  icon,
  label,
  shortcut,
  active,
}: {
  icon: React.ReactNode
  label: string
  shortcut?: string
  active?: boolean
}) {
  return (
    <button
      className={`flex items-center gap-2.5 px-3 py-2 w-full rounded-xl transition-all ${
        active
          ? "bg-sidebar-accent text-foreground shadow-sm"
          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"
      }`}
    >
      <span className={active ? "text-foreground" : "text-muted-foreground"}>{icon}</span>
      <span className="text-sm font-medium flex-1 text-left">{label}</span>
      {shortcut && <span className="text-[10px] text-muted-foreground/60 font-mono">{shortcut}</span>}
    </button>
  )
}
