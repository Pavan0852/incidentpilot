
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_rejects_incident_shorter_than_10_characters():
    response = client.post(
        "/api/analyze",
        json={
            "incident": "Error",
            "logs": "Sample logs",
        },
    )

    assert response.status_code == 422


def test_rejects_missing_incident():
    response = client.post(
        "/api/analyze",
        json={
            "logs": "Database connection timed out",
        },
    )

    assert response.status_code == 422


def test_rejects_missing_request_body_fields():
    response = client.post(
        "/api/analyze",
        json={},
    )

    assert response.status_code == 422
