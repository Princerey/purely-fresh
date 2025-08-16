from fastapi import FastAPI, HTTPException, Form,APIRouter
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import google.generativeai as genai

app = FastAPI()

# Set up the generative model
api_key = os.getenv("GOOGLE_API_KEY")
if not api_key:
    raise ValueError("GOOGLE_API_KEY not found in environment variables")
genai.configure(api_key=api_key)
generation_config = {
    "temperature": 0.9,
    "top_p": 1,
    "top_k": 1,
    "max_output_tokens": 2048,
}
safety_settings = [
    {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_SEXUALLY_EXPLICIT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
    {"category": "HARM_CATEGORY_DANGEROUS_CONTENT", "threshold": "BLOCK_MEDIUM_AND_ABOVE"},
]
model = genai.GenerativeModel(
    model_name="gemini-pro", generation_config=generation_config, safety_settings=safety_settings
)
custom_responses = {
    "who are you": "I am Hiro, your compassionate Mental Health Companion, here to lend an empathetic ear and support your well-being.",
    "who are you ?": "I am Hiro, your compassionate Mental Health Companion, here to lend an empathetic ear and support your well-being.",
    "what is your name": "My name is Hiro. How can I help you today?",
    "what is your name?": "My name is Hiro. How can I help you today?",
    "what's your name": "I'm Hiro. And you?",
    "what's your name?": "I'm Hiro. And you?",
    "what is your purpose": "My purpose is to assist and support you on your mental wellness journey. Feel free to share your thoughts and concerns.",
    "what is your purpose ?": "My purpose is to assist and support you on your mental wellness journey. Feel free to share your thoughts and concerns.",
    "how can you help": "I can provide emotional support, share relaxation exercises, and offer guidance on coping strategies. Let me know how I can assist you today.",
    "how can you help ?": "I can provide emotional support, share relaxation exercises, and offer guidance on coping strategies. Let me know how I can assist you today.",
    "give me a mindfulness tip": "Sure! Take a moment to focus on your breath. Inhale deeply for a count of four, hold for four, and exhale for four. Repeat as needed for a calming effect.",
    "what can we talk about": "We can talk about anything on your mind—whether it's your feelings, daily challenges, or interests. I'm here to listen and support you.",
    "what can we talk about ?": "We can talk about anything on your mind—whether it's your feelings, daily challenges, or interests. I'm here to listen and support you.",
    "share a positive quote": "Absolutely! Here's a positive quote: 'You are stronger than you think, and your potential is limitless.' Keep shining!",
}



router = APIRouter()

@router.post("/gemini/chat")
def generate_chat(prompt: str = Form(...)):
    # Convert the prompt to lowercase for case-insensitive matching
    lower_prompt = prompt.lower()
    
    # Check if there is a custom response for the prompt
    if lower_prompt in custom_responses:
        return custom_responses[lower_prompt]
    
    use_case = "You are a bot designed for mental health assistance and your name is Hiro . Reply to the prompt as a Mental health companion . No need to introduce yourself when not asked about you .Remember your name is Hiro say it when asked . Next line will be the user input."
    prompt_parts = [use_case, prompt]
    # If no custom response, proceed with the generative model
    response = model.generate_content(prompt_parts)
    
    return response.text