from app.agents.triage_agent import TriageAgent


agent = TriageAgent()


result = agent.analyze(
    incident="Payment API is returning 500 errors",
    logs="ConnectionTimeoutError: database connection timed out",
)


print("\n--- TRIAGE RESULT ---")
print(result.model_dump_json(indent=2))