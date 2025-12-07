# 🎯 Smart Goal Breaker

AI-powered goal breakdown app that transforms vague goals into 5 actionable steps using Gemini AI.

## 🚀 Quick Start

```bash
# 1. Clone & setup
git clone https://github.com/abmoh4219/smart-goal-breaker.git
cp .env.example .env
# Edit .env with your Gemini API key

# 2. Run with Docker
cd smart-goal-breaker 
docker-compose up --build

# 3. Test API
curl -X POST http://localhost:8000/api/v1/goals/ \
  -H "Content-Type: application/json" \
  -d '{"original_goal": "Learn Docker"}'