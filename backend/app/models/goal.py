from sqlalchemy import Column, Integer, String, JSON, DateTime, func
from app.db.database import Base
from datetime import datetime

class Goal(Base):
    __tablename__ = "goals"
    id = Column(Integer, primary_key=True, index=True)
    original_goal = Column(String, nullable=False)
    steps = Column(JSON, nullable=False)
    complexity = Column(Integer, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)