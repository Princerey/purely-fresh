# from fastapi import APIRouter,Form
# from fastapi.responses import HTMLResponse
# import openai

# router = APIRouter()
# @router.post("/openai/chat/", response_class=HTMLResponse)
# async def generate_response(prompt: str = Form(...)):
#     print(f"Received prompt: {prompt}")
#     # Use the OpenAI API to generate a response based on the input prompt
#     response = openai.Completion.create(
#         engine="text-davinci-003",  # You can choose a different engine if needed
#         prompt=prompt,
#         max_tokens=150,  # Adjust the max_tokens based on your requirements
#         temperature=0.7,  # Adjust the temperature based on your requirements
#         n=1,  # You can change the number of completions if needed
#         stop=None  # You can provide a list of stop words to limit the response
#     )

#     # Extract the generated text from the OpenAI response
#     generated_text = response['choices'][0]['text']

#     # You can customize the HTML response format
#     html_response = f"{generated_text}"

#     return HTMLResponse(content=html_response)