from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.incident import IncidentRequest, IncidentResponse
from app.state.incident_state import IncidentState
from app.graph.incident_graph import incident_graph


app = FastAPI(
    title="IncidentPilot API",
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "incidentpilot-api",
        "version": "1.0.0",
    }


@app.post(
    "/api/analyze",
    response_model=IncidentResponse,
)
async def analyze_incident_endpoint(
    request: IncidentRequest,
):
    initial_state = IncidentState(
        incident=request.incident,
        logs=request.logs,
    )

    result = incident_graph.invoke(initial_state)

    return IncidentResponse(
        status="completed",
        triage=result["triage"],
        diagnosis=result["diagnosis"],
        resolution=result["resolution"],
    )