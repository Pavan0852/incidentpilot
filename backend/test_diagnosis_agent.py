from app.state.incident_state import IncidentState
from app.workflow import analyze_incident


state = IncidentState(
    incident="Payment API is returning 500 errors",
    logs="ConnectionTimeoutError: database connection timed out",
)


result = analyze_incident(state)


print("\n--- FINAL STATE ---")
print(result.model_dump_json(indent=2))