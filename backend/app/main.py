from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.agents.triage_agent import TriageAgent
from app.schemas.incident import IncidentRequest, IncidentResponse


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


triage_agent = TriageAgent()


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
async def analyze_incident(
    request: IncidentRequest,
):
    triage_result = triage_agent.analyze(
        incident=request.incident,
        logs=request.logs,
    )

    return IncidentResponse(
        status="completed",
        triage=triage_result,
    )