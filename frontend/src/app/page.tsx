"use client";

import { useState } from "react";
import {
  analyzeIncident,
  IncidentResponse,
} from "@/lib/api";

export default function Home() {
  const [result, setResult] =
    useState<IncidentResponse | null>(null);

  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    setLoading(true);

    try {
      const response = await analyzeIncident({
        incident:
          "Payment API is returning 500 errors",
        logs:
          "ConnectionTimeoutError: database connection timed out",
      });

      setResult(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        IncidentPilot
      </h1>

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="mt-6 border-2 border-black px-5 py-3"
      >
        {loading ? "Analyzing..." : "Analyze Incident"}
      </button>

      {result && (
        <pre className="mt-6 whitespace-pre-wrap">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}