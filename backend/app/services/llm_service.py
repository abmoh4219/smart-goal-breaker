import json
import google.generativeai as genai
from app.core.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)

model = genai.GenerativeModel("gemini-2.5-flash")


def generate_steps(goal: str) -> dict:

    prompt = f"""
    Break the following goal into EXACTLY 5 actionable steps.
    Each step must have:
    - "step": short title
    - "description": brief explanation

    Also include a complexity score from 1 to 10.

    Goal: "{goal}"

    Return ONLY valid JSON:
    {{
    "steps": [
        {{"step": "Step title", "description": "What to do"}},
        {{...}},
        {{...}},
        {{...}},
        {{...}}
    ],
    "complexity": 5
    }}
    """

    response = model.generate_content(
        prompt,
        generation_config={"response_mime_type": "application/json"}
    )

    raw = response.text.strip()

    if raw.startswith("```"):
        raw = raw.replace("```json", "").replace("```", "").strip()

    return json.loads(raw)
