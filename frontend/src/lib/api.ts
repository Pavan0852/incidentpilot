const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface IncidentRequest {
  incident: string;
  logs?: string;
}

export interface TriageResult {
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  category: string;
  service: string;
  symptoms: string[];
  summary: string;
}

export interface DiagnosisResult {
  likely_root_cause: string;
  confidence: string;
  evidence: string[];
  explanation: string;
}

export interface ResolutionResult {
  recommended_actions: string[];
  verification_steps: string[];
  safety_notes: string[];
}

export interface IncidentResponse {
  status: string;
  triage: TriageResult;
  diagnosis: DiagnosisResult;
  resolution: ResolutionResult;
}


export async function analyzeIncident(
  request: IncidentRequest,
): Promise<IncidentResponse> {
  let response: Response;

  try {
    response = await fetch(`${API_URL}/api/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "Cannot connect to IncidentPilot API. Please try again later.",
        );
      }

      throw new Error("An unexpected error occurred.");
    }

  if (!response.ok) {
    let message = "Incident analysis failed. Please try again.";

    try {
      const body = await response.json();

      if (response.status === 422) {
        message =
          "Please check your incident description and try again.";
      } else if (
        response.status === 502 &&
        typeof body.detail === "string"
      ) {
        message = body.detail;
      }
    } catch {
      // Keep the safe fallback message if the response isn't JSON.
    }

    throw new Error(message);
  }

  return response.json() as Promise<IncidentResponse>;
}
