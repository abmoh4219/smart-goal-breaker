from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.services.goal_service import create_goal
from app.schemas.goal import GoalCreate, GoalResponse

router = APIRouter()

@router.post("/", response_model=GoalResponse)
def create_goal_endpoint(
    goal: GoalCreate,
    db: Session = Depends(get_db)
):
    try:
        return create_goal(db, goal)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
