from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware 
from app.core.config import settings
from app.api.v1.goal import router as goal_router

# Database tables are managed by Alembic migrations
# Run: alembic upgrade head


app = FastAPI(title=settings.PROJECT_NAME, version=settings.PROJECT_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(goal_router, prefix=settings.API_V1_STR+"/goals")

@app.get("/")
def health():
    return {"message": "Smart Goal Breaker API is running!"}
