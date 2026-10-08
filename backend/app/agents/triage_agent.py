from app.schemas.triage import TriageResult
from app.services.gemini import client


class TriageAgent:
    """
    Agent responsible for analyzing an incident and producing
    a structured triage result.
    """

    def __init__(self):
        self.model = "gemini-3.5-flash-lite"

    def analyze(
        self,
        incident: str,
        logs: str | None = None,
    ) -> TriageResult:

        prompt = f"""
You are an Incident Triage Agent.

Your job is to analyze a technical incident and determine:

1. Severity
2. Incident category
3. Affected service
4. Observable symptoms
5. A concise incident summary

Use only the information provided by the user.

Do not invent specific facts that are not supported by the incident
or logs.

Severity must represent the likely impact:

- LOW: minor issue with limited impact
- MEDIUM: noticeable issue affecting some functionality
- HIGH: major functionality is impacted or users are significantly affected
- CRITICAL: widespread outage, severe business impact, or critical service failure

Incident:
{incident}

Logs:
{logs or "No logs provided"}
"""

        interaction = client.interactions.create(
            model=self.model,
            input=prompt,
            response_format={
                "type": "text",
                "mime_type": "application/json",
                "schema": TriageResult.model_json_schema(),
            },
        )

        return TriageResult.model_validate_json(
            interaction.output_text
        )