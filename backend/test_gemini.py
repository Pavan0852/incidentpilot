from app.services.gemini import generate_text


response = generate_text(
    "Explain what an HTTP 500 error means in one sentence."
)

print(response)