import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    raise RuntimeError(
        "GEMINI_API_KEY environment variable is not configured."
    )


client = genai.Client(api_key=api_key)


def generate_text(prompt: str) -> str:
    interaction = client.interactions.create(
        model="gemini-3.5-flash-lite",
        input=prompt,
    )

    return interaction.output_text