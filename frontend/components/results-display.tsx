"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Goal, Step } from "@/types/goal"
import { ArrowLeft, Sparkles } from "lucide-react"
import StepCard from "@/components/step-card"
import { Badge } from "@/components/ui/badge"

interface ResultsDisplayProps {
  goal: Goal
  onReset: () => void
}

export default function ResultsDisplay({ goal, onReset }: ResultsDisplayProps) {
  const getComplexityColor = (score: number) => {
    if (score <= 3) return "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/30"
    if (score <= 7) return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/30"
    return "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/30"
  }

  const getComplexityLabel = (score: number) => {
    if (score <= 3) return "Easy"
    if (score <= 7) return "Moderate"
    return "Challenging"
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <Button onClick={onReset} variant="ghost" className="mb-6 text-muted-foreground hover:text-foreground">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <h2 className="text-4xl font-bold mb-2 text-balance break-words">{goal.goal}</h2>
              <div className="flex items-center gap-2 flex-wrap">
                <Sparkles className="w-4 h-4 text-primary flex-shrink-0" />
                <p className="text-muted-foreground">AI-generated action plan with 5 concrete steps</p>
              </div>
            </div>

            <Badge
              variant="outline"
              className={`px-4 py-2 rounded-full border-2 text-center whitespace-nowrap flex-shrink-0 ${getComplexityColor(goal.complexity_score)}`}
            >
              <div className="text-lg font-bold">{goal.complexity_score}/10</div>
              <div className="text-xs">{getComplexityLabel(goal.complexity_score)}</div>
            </Badge>
          </div>
        </div>
      </div>

      {/* Steps Grid */}
      <div className="space-y-6 mb-8">
        <div>
          <h3 className="text-2xl font-semibold mb-6">Your Action Steps</h3>
          <div className="grid gap-4">
            {goal.steps && goal.steps.length > 0 ? (
              goal.steps.map((step: Step, index: number) => (
                <StepCard key={index} step={step} index={index + 1} totalSteps={goal.steps?.length || 5} />
              ))
            ) : (
              <Card className="p-8 border-2 border-dashed border-border/50 text-center">
                <p className="text-muted-foreground">No steps available</p>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Button
          onClick={onReset}
          className="flex-1 py-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 font-semibold rounded-lg"
        >
          Break Down Another Goal
        </Button>
        <Button variant="outline" className="flex-1 py-6 font-semibold rounded-lg border-2 bg-transparent">
          Save & Track Progress
        </Button>
      </div>
    </div>
  )
}
