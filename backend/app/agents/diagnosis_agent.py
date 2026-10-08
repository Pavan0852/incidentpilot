from app.schemas.diagnosis import DiagnosisResult
from app.schemas.triage import TriageResult
from app.services.gemini import client


class DiagnosisAgent:
    """
    Agent responsible for identifying the likely root cause
    of an incident using the incident details and triage result.
    """

    def __init__(self):
        self.model = "gemini-3.5-flash-lite"

    def analyze(
        self,
        incident: str,
        logs: str | None,
        triage: TriageResult,
    ) -> DiagnosisResult:

        prompt = f"""
You are an Incident Diagnosis Agent.

Your job is to determine the most likely root cause
of a technical incident.

Use:
1. The original incident
2. The available logs
3. The triage analysis

Do not invent evidence that is not present.

Provide:
- The most likely root cause
- Your confidence level
- The evidence supporting the diagnosis
- A concise explanation connecting the evidence to the root cause

Original Incident:
{incident}

Logs:
{logs or "No logs provided"}

Triage Analysis:
{triage.model_dump_json(indent=2)}
"""

        interaction = client.interactions.create(
            model=self.model,
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": DiagnosisResult.model_json_schema(),
            },
        )

        return DiagnosisResult.model_validate_json(
            interaction.output_text
        )