from pydantic import BaseModel
from typing import List
from datetime import datetime

class Step(BaseModel):
    step: str
    description: str

class GoalCreate(BaseModel):
    original_goal: str

class GoalResponse(BaseModel):
    id: int
    original_goal: str
    steps: List[Step]
    complexity: int
    created_at: datetime

    class Config:
        from_attributes = True