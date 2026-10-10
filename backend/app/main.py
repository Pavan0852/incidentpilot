
import logging
import os

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.schemas.incident import IncidentRequest, IncidentResponse
from app.state.incident_state import IncidentState
from app.graph.incident_graph import incident_graph


logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="IncidentPilot API",
    version="1.0.0",
)

# Comma-separated list of allowed frontend origins.
cors_origins = [
    origin.strip()
    for origin in os.getenv(
        "CORS_ORIGINS",
        "http://localhost:3000",
    ).split(",")
    if origin.strip()
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
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
def analyze_incident_endpoint(
    request: IncidentRequest,
):
    try:
        initial_state = IncidentState(
            incident=request.incident,
            logs=request.logs,
        )

        result = incident_graph.invoke(initial_state)

        # Ensure all expected agents produced results.
        required_results = ("triage", "diagnosis", "resolution")

        if any(result.get(key) is None for key in required_results):
            logger.error(
                "Incident graph finished without all required results."
            )
            raise HTTPException(
                status_code=502,
                detail="Incident analysis did not produce a complete report.",
            )

        return IncidentResponse(
            status="completed",
            triage=result["triage"],
            diagnosis=result["diagnosis"],
            resolution=result["resolution"],
        )

    except HTTPException:
        raise

    except Exception:
        # Keep technical details in server logs, not API responses.
        logger.exception("Incident analysis failed.")

        raise HTTPException(
            status_code=502,
            detail=(
                "Incident analysis is temporarily unavailable. "
                "Please try again later."
            ),
        ) from None
