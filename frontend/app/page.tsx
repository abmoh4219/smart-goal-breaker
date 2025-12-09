"use client"

import { useState } from "react"
import GoalInput from "@/components/goal-input"
import ResultsDisplay from "@/components/results-display"
import Header from "@/components/header"
import type { Goal } from "@/types/goal"

export default function Home() {
  const [goal, setGoal] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleGoalSubmit = async (goalText: string) => {
    setLoading(true)
    setError(null)
    setGoal(null)

    try {
      const response = await fetch("/api/break-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal: goalText }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Failed to break down goal")
      }

      const data = await response.json()
      setGoal(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {!goal ? (
          <GoalInput onSubmit={handleGoalSubmit} loading={loading} error={error} />
        ) : (
          <ResultsDisplay goal={goal} onReset={() => setGoal(null)} />
        )}
      </main>
    </div>
  )
}
