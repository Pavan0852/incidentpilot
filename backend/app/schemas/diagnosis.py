from pydantic import BaseModel

class DiagnosisResult(BaseModel):
    likely_root_cause: str
    confidence: str
    evidence: list[str]
    explanation: str