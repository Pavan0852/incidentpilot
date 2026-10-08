from typing import Literal

from pydantic import BaseModel


class TriageResult(BaseModel):
    severity: Literal["LOW", "MEDIUM", "HIGH", "CRITICAL"]
    category: str
    service: str
    symptoms: list[str]
    summary: str