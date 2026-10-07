const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface IncidentRequest {
  incident: string;
  logs?: string;
}

export interface IncidentResponse {
  status: string;
  message: string;
  incident: string;
  logs: string | null;
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