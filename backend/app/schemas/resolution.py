from pydantic import BaseModel


class ResolutionResult(BaseModel):
    recommended_actions: list[str]
    verification_steps: list[str]
    safety_notes: list[str]