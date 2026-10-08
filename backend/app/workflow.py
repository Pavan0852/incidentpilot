from app.agents.diagnosis_agent import DiagnosisAgent
from app.agents.triage_agent import TriageAgent
from app.state.incident_state import IncidentState


triage_agent = TriageAgent()
diagnosis_agent = DiagnosisAgent()


def analyze_incident(state: IncidentState) -> IncidentState:
    # Step 1: Triage
    state.triage = triage_agent.analyze(
        incident=state.incident,
        logs=state.logs,
    )

    # Step 2: Diagnosis
    state.diagnosis = diagnosis_agent.analyze(
        incident=state.incident,
        logs=state.logs,
        triage=state.triage,
    )

    return state