from pydantic import BaseModel, Field

from app.schemas.triage import TriageResult


class IncidentRequest(BaseModel):
    incident: str = Field(
        ...,
        min_length=10,
        description="Description of the incident",
    )
    logs: str | None = Field(
        default=None,
        description="Optional incident logs",
    )


class IncidentResponse(BaseModel):
    status: str
    triage: TriageResult