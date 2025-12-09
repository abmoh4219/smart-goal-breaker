"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Loader2, Zap, Target, Gauge } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface GoalInputProps {
  onSubmit: (goal: string) => Promise<void>
  loading: boolean
  error: string | null
}

export default function GoalInput({ onSubmit, loading, error }: GoalInputProps) {
  const [goal, setGoal] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (goal.trim()) {
      await onSubmit(goal)
    }
  }

  return (
    <div className="min-h-[calc(100vh-120px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-4 border border-primary/20">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
            </div>
          </div>

          <h2 className="text-5xl sm:text-6xl font-bold mb-4 text-balance">
            Turn Your Vision Into <br />
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Actionable Steps
            </span>
          </h2>

          <p className="text-lg text-muted-foreground mb-8 text-balance max-w-xl mx-auto">
            Stop overthinking. Let AI break down your goal into clear, manageable steps with complexity scoring.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 rounded-lg blur-lg opacity-60 group-hover:opacity-100 transition duration-300"></div>
            <div className="relative">
              <Input
                type="text"
                placeholder="e.g., Launch a tech startup, Learn machine learning, Write a novel..."
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                disabled={loading}
                className="w-full px-6 py-4 text-lg rounded-lg border-2 border-primary/30 bg-card/80 backdrop-blur focus:border-primary focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50"
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button
            type="submit"
            disabled={loading || !goal.trim()}
            className="w-full py-6 text-lg font-semibold rounded-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 disabled:opacity-50 transition"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Breaking Down Your Goal...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 mr-2" />
                Break Down Goal
              </>
            )}
          </Button>
        </form>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Results in seconds",
              color: "from-blue-500/10 to-cyan-500/10",
            },
            {
              icon: Target,
              title: "5 Action Steps",
              desc: "Concrete & achievable",
              color: "from-purple-500/10 to-pink-500/10",
            },
            {
              icon: Gauge,
              title: "Complexity Score",
              desc: "1-10 difficulty rating",
              color: "from-green-500/10 to-emerald-500/10",
            },
          ].map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className={`p-6 rounded-lg bg-gradient-to-br ${feature.color} border border-border/50 hover:border-primary/50 transition`}
              >
                <Icon className="w-8 h-8 mb-3 text-primary" />
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
