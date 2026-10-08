import json

from app.graph.incident_graph import incident_graph
from app.state.incident_state import IncidentState


initial_state = IncidentState(
    incident="Payment API is returning 500 errors",
    logs="ConnectionTimeoutError: database connection timed out",
)


result = incident_graph.invoke(initial_state)


print("\n--- GRAPH RESULT ---")
print(json.dumps(result, indent=2, default=str))