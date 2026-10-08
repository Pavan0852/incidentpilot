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
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze incident");
  }

  return response.json();
}