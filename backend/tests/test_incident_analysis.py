
from fastapi.testclient import TestClient
from app.main import app
import app.main as main_module

client = TestClient(app)


def test_successful_incident_analysis(monkeypatch):
    def fake_invoke(initial_state):
        return {
            "incident": initial_state.incident,
            "logs": initial_state.logs,
            "triage": {
                "severity": "HIGH",
                "category": "Database / Connectivity",
                "service": "Payment API",
                "symptoms": ["Payment API is returning 500 errors"],
                "summary": "The Payment API is experiencing database connection issues.",
            },
            "diagnosis": {
                "likely_root_cause": "Database connection timeout",
                "confidence": "High",
                "evidence": ["ConnectionTimeoutError in the logs"],
                "explanation": "The database connection is timing out.",
            },
            "resolution": {
                "recommended_actions": ["Investigate database connectivity."],
                "verification_steps": ["Verify the API can connect to the database."],
                "safety_notes": ["Follow production change-management procedures."],
            },
        }

    monkeypatch.setattr(
        main_module.incident_graph,
        "invoke",
        fake_invoke,
    )

    response = client.post(
        "/api/analyze",
        json={
            "incident": "Payment API is returning 500 errors",
            "logs": "ConnectionTimeoutError: database connection timed out",
        },
    )

    assert response.status_code == 200

    data = response.json()
    assert data["status"] == "completed"
    assert data["triage"]["severity"] == "HIGH"
    assert data["diagnosis"]["likely_root_cause"] == "Database connection timeout"
    assert len(data["resolution"]["recommended_actions"]) > 0
