# 🎯 Smart Goal Breaker

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](http://localhost:3000)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-009688)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

> Transform vague goals into actionable steps using AI-powered intelligence

Smart Goal Breaker is a full-stack web application that uses Google's Gemini AI to break down your goals into 5 clear, actionable steps. Whether you're planning to learn a new skill, start a project, or achieve a personal milestone, this app helps you create a concrete roadmap.

## ✨ Features

- 🤖 **AI-Powered Breakdown**: Leverages Google Gemini AI to intelligently analyze and decompose goals
- 📊 **Complexity Analysis**: Provides a complexity score (1-10) for each goal
- 🎨 **Modern UI**: Beautiful, responsive interface with dark mode support
- ⚡ **Real-time Processing**: Fast API responses with streaming capabilities
- 💾 **Persistent Storage**: PostgreSQL database stores all goals and their breakdowns
- 🔄 **RESTful API**: Well-documented backend API for integration
- 🎭 **Animated Interface**: Smooth transitions and micro-interactions

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16.0](https://nextjs.org/) with App Router & React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4.0
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
- **Language**: Python 3.12+
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic
- **AI**: Google Generative AI (Gemini)
- **Server**: Uvicorn

### DevOps
- **Containerization**: Docker & Docker Compose
- **Backend Hosting**: Render
- **Frontend Hosting**: Vercel (recommended)
- **Database**: Render PostgreSQL

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Python 3.12+
- PostgreSQL 15+
- [Google Gemini API Key](https://makersuite.google.com/app/apikey)

### Local Development

#### 1. Clone the repository

```bash
git clone https://github.com/abmoh4219/smart-goal-breaker.git
cd smart-goal-breaker
```

#### 2. Set up environment variables

```bash
# Root directory
cp .env.example .env
# Edit .env and add your Gemini API key and database credentials
```

```bash
# Frontend directory
cd frontend
cp .env.local.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL
```

#### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
alembic upgrade head

# Start the server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at `http://localhost:8000`

#### 4. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will be available at `http://localhost:3000`

### 🐳 Docker Setup (Alternative)

Run the entire stack with Docker Compose:

```bash
docker-compose up --build
```

- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- Database: localhost:5432

## 📁 Project Structure

```
smart-goal-breaker/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       └── goal.py          # Goal API endpoints
│   │   ├── core/
│   │   │   └── config.py            # Configuration settings
│   │   ├── db/
│   │   │   └── database.py          # Database connection
│   │   ├── models/
│   │   │   └── goal.py              # SQLAlchemy models
│   │   ├── schemas/
│   │   │   └── goal.py              # Pydantic schemas
│   │   ├── services/
│   │   │   └── goal_service.py      # Business logic
│   │   └── main.py                  # FastAPI app entry
│   ├── alembic/                     # Database migrations
│   ├── Dockerfile
│   ├── requirements.txt
│   └── start.sh                     # Production startup script
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── break-goal/
│   │   │       └── route.ts         # API route handler
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Home page
│   │   └── globals.css              # Global styles
│   ├── components/
│   │   ├── goal-input.tsx           # Goal input form
│   │   ├── results-display.tsx      # Results view
│   │   ├── step-card.tsx            # Individual step card
│   │   ├── header.tsx               # App header
│   │   ├── theme-provider.tsx       # Theme context
│   │   └── theme-toggle.tsx         # Dark mode toggle
│   ├── types/
│   │   └── goal.ts                  # TypeScript types
│   ├── package.json
│   └── next.config.js
├── docker-compose.yml
├── .env.example
└── README.md
```

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
# Database
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_password
POSTGRES_DB=goalbreaker
POSTGRES_HOST=localhost  # Use 'db' for Docker
POSTGRES_PORT=5432

# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# App Settings
PROJECT_NAME="Smart Goal Breaker"
PROJECT_VERSION="1.0.0"
API_V1_STR="/api/v1"
BACKEND_CORS_ORIGINS=["http://localhost:3000","https://your-vercel-domain.vercel.app"]
```

#### Frontend (.env.local)

```env
# Backend API URL (no trailing slash)
NEXT_PUBLIC_API_URL="http://localhost:8000"
# For production: https://your-backend-domain.onrender.com
```

## 📡 API Documentation

### Base URL

- **Development**: `http://localhost:8000`
- **Production**: `https://your-backend-url.onrender.com` (your deployed backend)

### Endpoints

#### Create Goal Breakdown

```http
POST /api/v1/goals/
Content-Type: application/json

{
  "original_goal": "Become a pro frontend developer in 3 months"
}
```

**Response:**

```json
{
  "id": 1,
  "original_goal": "Become a pro frontend developer in 3 months",
  "complexity": 7,
  "steps": [
    {
      "step": "Master HTML, CSS & JavaScript Fundamentals",
      "description": "Spend 3-4 weeks building solid foundations..."
    },
    {
      "step": "Learn a Modern Framework (React/Vue/Angular)",
      "description": "Dedicate 3-4 weeks to mastering one framework..."
    }
    // ... 3 more steps
  ],
  "created_at": "2025-12-09T08:43:48.494905Z"
}
```

#### Interactive API Docs

Visit `/docs` on your backend URL for Swagger UI documentation.

## 🚀 Deployment

### Backend (Render)

1. **Create a new Web Service** on [Render](https://render.com)
2. **Connect your GitHub repository**
3. **Configure the service:**
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `cd backend && bash start.sh`
   - Environment: Python 3
4. **Add Environment Variables** (from `.env.example`)
5. **Create a PostgreSQL database** and link it
6. **Deploy!**

### Frontend (Vercel)

1. **Import your repository** on [Vercel](https://vercel.com)
2. **Configure the project:**
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`
3. **Add Environment Variables:**
   - `NEXT_PUBLIC_API_URL`: Your Render backend URL
4. **Deploy!**

> **Note**: After deployment, update `BACKEND_CORS_ORIGINS` in your backend environment to include your Vercel domain.

## 🧪 Usage Examples

### Example Goals to Try

1. "Learn TypeScript in 2 months"
2. "Build a mobile app from scratch"
3. "Get fit and lose 10kg in 6 months"
4. "Launch a YouTube channel with 1000 subscribers"
5. "Master data structures and algorithms"

### API Usage with cURL

```bash
# Test the API (replace with your deployed backend URL)
curl -X POST https://your-backend-url.onrender.com/api/v1/goals/ \
  -H "Content-Type: application/json" \
  -d '{"original_goal": "Learn Docker in 1 month"}'
```

### API Usage with JavaScript

```javascript
// Replace with your deployed backend URL
const response = await fetch('https://your-backend-url.onrender.com/api/v1/goals/', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ original_goal: 'Learn Docker in 1 month' })
});

const data = await response.json();
console.log(data.steps);
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Abdelah**
- GitHub: [@abmoh4219](https://github.com/abmoh4219)

## 🙏 Acknowledgments

- [Google Gemini AI](https://ai.google.dev/) for powering the goal breakdown intelligence
- [Vercel](https://vercel.com/) for Next.js and hosting
- [Render](https://render.com/) for backend hosting
- [FastAPI](https://fastapi.tiangolo.com/) for the amazing Python framework
- [Radix UI](https://www.radix-ui.com/) for accessible UI components

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub.

---

<div align="center">
  Made with ❤️ by Abdelah
</div>