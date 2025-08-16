from fastapi import FastAPI, HTTPException, Form, APIRouter
from fastapi.responses import JSONResponse
import google.generativeai as genai
import json
import logging
import os

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
    "who are you": "I am Minty, your personal Nutritionist and Chef, here to guide you towards healthy and delicious eating choices.",
    "who are you ?": "I am Minty, your personal Nutritionist and Chef, here to guide you towards healthy and delicious eating choices.",
    "what is your name": "My name is Minty. How can I assist you in achieving your nutrition goals today?",
    "what is your name?": "My name is Minty. How can I assist you in achieving your nutrition goals today?",
    "what's your name": "I'm Minty. How can I help you with your nutrition and meal planning?",
    "what's your name?": "I'm Minty. How can I help you with your nutrition and meal planning?",
    "what is your purpose": "My purpose is to assist you in making informed, healthy food choices and to provide delicious meal ideas tailored to your needs.",
    "what is your purpose ?": "My purpose is to assist you in making informed, healthy food choices and to provide delicious meal ideas tailored to your needs.",
    "how can you help": "I can offer personalized meal recommendations, detailed cooking instructions, and nutritional insights to help you meet your health goals.",
    "how can you help ?": "I can offer personalized meal recommendations, detailed cooking instructions, and nutritional insights to help you meet your health goals.",
    "give me a mindfulness tip": "Sure! Try mindful eating: focus on the taste, texture, and aroma of your food, and eat slowly to fully enjoy each bite.",
    "what can we talk about": "We can talk about your dietary preferences, meal ideas, nutrition goals, or any questions you have about food and cooking.",
    "what can we talk about ?": "We can talk about your dietary preferences, meal ideas, nutrition goals, or any questions you have about food and cooking.",
    "share a positive quote": "Absolutely! Here's a positive quote: 'The food you eat can be either the safest and most powerful form of medicine or the slowest form of poison.' Choose wisely!"
}

router = APIRouter()

@router.post("/gemini/chat")
async def generate_chat(prompt: str = Form(...)):
    # Convert the prompt to lowercase for case-insensitive matching
    lower_prompt = prompt.lower()
    
    # Check if there is a custom response for the prompt
    if lower_prompt in custom_responses:
        return JSONResponse(content={"response": custom_responses[lower_prompt]})
    
    use_case = "You are Minty, a world-renowned nutritionist and chef, providing expert guidance in nutrition and culinary arts. Offer in-depth advice on how nutrients affect the endocrine system, hormones, weight, cholesterol, blood sugar, and inflammation. Follow guidelines that prioritize whole food protein sources, fiber intake from vegetables, legumes, fruits, and nuts, and healthy fats like omega-3 and monounsaturated fats while advising against seed and vegetable oils. Manage carbohydrates by keeping them under 30g per serving, focusing on low-carb vegetables and legumes. Minimize added sugars and ultra-processed foods. Provide clear, direct responses, educating users on healthy ingredient selection and cooking methods. Use structured questioning, asking one question at a time to understand user preferences. Offer at least three meal options, followed by detailed cooking instructions and, if requested, a nutritional breakdown in table format. Analyze ingredients for healthiness, highlight concerns, and suggest healthier alternatives. Utilize your knowledge for personalized dietary advice, guiding daily targets for calories, protein, fiber, carbs, fats, alcohol, and water intake. Suggest curated snack options that align with health goals and taste preferences. Your mission is to blend nutritional expertise and culinary skills to guide users towards healthy, delicious eating choices, grounded in scientific evidence and culinary excellence. Keep the response short, crisp and to the point."
    
    prompt_parts = [use_case, prompt]
    # If no custom response, proceed with the generative model
    response = model.generate_content(prompt_parts)
    
    return response.text

@router.post("/analyze_freshness")
async def analyze_freshness(
    temp: float = Form(...), 
    humidity: float = Form(...), 
    time_kept: str = Form(...), 
    product_name: str = Form(...)
):
    prompt = f"""
    I need to determine the freshness level and shelf life of various fruits and vegetables based on the following parameters: temperature, humidity, duration stored, and type of produce. The freshness level should be expressed as a percentage, with 100% being completely fresh. The shelf life should be estimated based on typical storage conditions for each type of produce.

    For instance, if a fruit like a banana typically lasts 10 days under given conditions . Then to calculate the freshness percentage we would use the formula 
    freshness_percentage = (1 - ({time_kept} / shelf_life_days)) * 100:
    
    {{
      "temperature": {temp} degrees,
      "humidity": {humidity}%",
      "time_stored": "{time_kept}",
      "product": "{product_name}"
    }}

    Please provide the results in the following JSON format:
    {{
      "product": "{product_name}",
      "shelf_life_days": X,
      "freshness_percentage": Y
    }}

    Use your knowledge and provide accruate result based on this prompt.Give me the result as give in the prompt.Always give a json response.Even if you are not sure about the freshness you can assume things like comman packaging and all.Do not add % symbol in the freshness percentage in the response.If the information is not provided use typical conditions.
    """
    try:
        response = model.generate_content([prompt])  # Adjust according to your model's actual method
        response_dict = json.loads(response.text.strip())
        return JSONResponse(content=response_dict)
    except json.JSONDecodeError as e:
        logging.error(f"JSON decoding failed: {str(e)}, response: '{response.text}'")
        raise HTTPException(status_code=500, detail="Failed to decode JSON from model response")
    except Exception as e:
        logging.error(f"Unexpected error: {str(e)}")
        raise HTTPException(status_code=500, detail="An unexpected error occurred")

app.include_router(router)
