"use client"

import { ThemeToggle } from "@/components/theme-toggle"

export default function Header() {
  return (
    <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">✓</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Smart Goal Breaker
              </h1>
              <p className="text-sm text-muted-foreground">AI-powered goal breakdown</p>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
