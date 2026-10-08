from app.agents.diagnosis_agent import DiagnosisAgent
from app.agents.resolution_agent import ResolutionAgent
from app.agents.triage_agent import TriageAgent


incident = "Payment API is returning 500 errors"

logs = "ConnectionTimeoutError: database connection timed out"


triage_agent = TriageAgent()
diagnosis_agent = DiagnosisAgent()
resolution_agent = ResolutionAgent()


triage_result = triage_agent.analyze(
    incident=incident,
    logs=logs,
)


diagnosis_result = diagnosis_agent.analyze(
    incident=incident,
    logs=logs,
    triage=triage_result,
)


resolution_result = resolution_agent.analyze(
    incident=incident,
    logs=logs,
    triage=triage_result,
    diagnosis=diagnosis_result,
)


print("\n--- TRIAGE RESULT ---")
print(triage_result.model_dump_json(indent=2))


print("\n--- DIAGNOSIS RESULT ---")
print(diagnosis_result.model_dump_json(indent=2))


print("\n--- RESOLUTION RESULT ---")
print(resolution_result.model_dump_json(indent=2))