from app.schemas.diagnosis import DiagnosisResult
from app.schemas.resolution import ResolutionResult
from app.schemas.triage import TriageResult
from app.services.gemini import client


class ResolutionAgent:
    """
    Agent responsible for recommending safe actions to resolve
    an incident and verify that the issue has been resolved.
    """

    def __init__(self):
        self.model = "gemini-3.5-flash-lite"

    def analyze(
        self,
        incident: str,
        logs: str | None,
        triage: TriageResult,
        diagnosis: DiagnosisResult,
    ) -> ResolutionResult:

        prompt = f"""
You are an Incident Resolution Agent.

Your job is to recommend practical and safe actions
for resolving a technical incident.

Use:
1. The original incident
2. The available logs
3. The triage analysis
4. The diagnosis analysis

Do not invent infrastructure details, commands,
credentials, configuration values, or system-specific facts.

Your recommendations should be general and safe unless
the provided evidence supports something more specific.

Provide:

1. Recommended actions
   - What should an engineer investigate or do to resolve the issue?

2. Verification steps
   - How should the engineer confirm that the incident is resolved?

3. Safety notes
   - What should the engineer be careful about while applying the resolution?

Original Incident:
{incident}

Logs:
{logs or "No logs provided"}

Triage Analysis:
{triage.model_dump_json(indent=2)}

Diagnosis Analysis:
{diagnosis.model_dump_json(indent=2)}
"""

        interaction = client.interactions.create(
            model=self.model,
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": ResolutionResult.model_json_schema(),
            },
        )

        return ResolutionResult.model_validate_json(
            interaction.output_text
        )