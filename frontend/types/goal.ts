export interface Step {
  title: string
  description: string
  details?: string[]
}

export interface Goal {
  goal: string
  steps: Step[]
  complexity_score: number
}
