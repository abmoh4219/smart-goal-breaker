import { type NextRequest, NextResponse } from "next/server"

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000").replace(/\/$/, "")

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { goal } = body

        if (!goal || typeof goal !== "string") {
            return NextResponse.json({ error: "Goal is required" }, { status: 400 })
        }

        console.log("Sending goal to backend:", goal)

        const response = await fetch(`${API_BASE_URL}/api/v1/goals/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ original_goal: goal }),
        })

        if (!response.ok) {
            const errorData = await response.json()
            console.log("Backend error:", errorData)
            throw new Error(errorData.detail || "Failed to break down goal")
        }

        const data = await response.json()
        console.log("Backend response:", data)

        return NextResponse.json({
            goal: data.original_goal,
            steps: data.steps,
            complexity_score: data.complexity,
        })
    } catch (error) {
        console.error("Goal breaking error:", error)
        return NextResponse.json(
            { error: error instanceof Error ? error.message : "Failed to break down goal" },
            { status: 500 },
        )
    }
}
