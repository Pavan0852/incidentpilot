from pydantic import BaseModel

from app.schemas.diagnosis import DiagnosisResult
from app.schemas.resolution import ResolutionResult
from app.schemas.triage import TriageResult


class IncidentState(BaseModel):
    incident: str
    logs: str | None = None
    triage: TriageResult | None = None
    diagnosis: DiagnosisResult | None = None
    resolution: ResolutionResult | None = None