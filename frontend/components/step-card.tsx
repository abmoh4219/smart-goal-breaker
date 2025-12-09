"use client"

import { Card } from "@/components/ui/card"
import type { Step } from "@/types/goal"
import { CheckCircle2, ChevronDown } from "lucide-react"
import { useState } from "react"

interface StepCardProps {
  step: Step
  index: number
  totalSteps: number
}

export default function StepCard({ step, index, totalSteps }: StepCardProps) {
  const [isExpanded, setIsExpanded] = useState(index === 1)

  const colors = [
    { bg: "from-blue-500/10 to-cyan-500/10", border: "border-blue-500/30", accent: "text-blue-600 dark:text-blue-400" },
    {
      bg: "from-purple-500/10 to-pink-500/10",
      border: "border-purple-500/30",
      accent: "text-purple-600 dark:text-purple-400",
    },
    {
      bg: "from-green-500/10 to-emerald-500/10",
      border: "border-green-500/30",
      accent: "text-green-600 dark:text-green-400",
    },
    {
      bg: "from-orange-500/10 to-red-500/10",
      border: "border-orange-500/30",
      accent: "text-orange-600 dark:text-orange-400",
    },
    {
      bg: "from-indigo-500/10 to-violet-500/10",
      border: "border-indigo-500/30",
      accent: "text-indigo-600 dark:text-indigo-400",
    },
  ]

  const color = colors[index % colors.length]

  return (
    <Card
      className={`border-2 bg-gradient-to-br ${color.bg} ${color.border} hover:shadow-lg transition cursor-pointer overflow-hidden`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="p-6">
        <div className="flex gap-4 items-start">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg flex-none">
            {index}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <p className="text-foreground/80">{step.description}</p>
              </div>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
              />
            </div>

            {isExpanded && step.details && step.details.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/30 space-y-3">
                {step.details.map((detail: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <CheckCircle2 className={`w-5 h-5 flex-shrink-0 mt-0.5 ${color.accent}`} />
                    <span className="text-foreground/80">{detail}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
