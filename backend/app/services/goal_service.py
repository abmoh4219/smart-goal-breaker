from sqlalchemy.orm import Session
from app.models.goal import Goal
from app.schemas.goal import GoalCreate
from app.services.llm_service import generate_steps

def create_goal(db: Session, goal: GoalCreate) -> Goal:
    ai_result = generate_steps(goal.original_goal)
    
    goal = Goal(
        original_goal=goal.original_goal,
        steps=ai_result["steps"],
        complexity=ai_result["complexity"],
    )

    db.add(goal)
    db.commit()
    db.refresh(goal)

    return goal