"use client";

import { useState } from "react";
import {
  analyzeIncident,
  IncidentResponse,
} from "@/lib/api";

export default function Home() {
  const [incident, setIncident] = useState("");
  const [logs, setLogs] = useState("");

  const [result, setResult] =
    useState<IncidentResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!incident.trim()) {
      setError("Please enter an incident description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await analyzeIncident({
        incident: incident.trim(),
        logs: logs.trim() || undefined,
      });

      setResult(response);
    } catch (error) {
      console.error(error);
      setError("Failed to analyze incident. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        IncidentPilot
      </h1>

      <div className="mt-8 max-w-3xl space-y-6">
        <div>
          <label
            htmlFor="incident"
            className="mb-2 block font-semibold"
          >
            Incident
          </label>

          <textarea
            id="incident"
            value={incident}
            onChange={(event) =>
              setIncident(event.target.value)
            }
            placeholder="Example: Payment API is returning 500 errors"
            className="min-h-32 w-full border-2 border-black p-3"
          />
        </div>

        <div>
          <label
            htmlFor="logs"
            className="mb-2 block font-semibold"
          >
            Logs
          </label>

          <textarea
            id="logs"
            value={logs}
            onChange={(event) =>
              setLogs(event.target.value)
            }
            placeholder="Optional logs or error messages"
            className="min-h-40 w-full border-2 border-black p-3"
          />
        </div>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="border-2 border-black px-5 py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Incident"}
        </button>

        {error && (
          <div className="border-2 border-red-600 p-4">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-6">
            <section className="border-2 border-black p-5">
              <h2 className="text-xl font-bold">
                Triage
              </h2>

              <p className="mt-3">
                <strong>Severity:</strong>{" "}
                {result.triage.severity}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {result.triage.category}
              </p>

              <p>
                <strong>Service:</strong>{" "}
                {result.triage.service}
              </p>

              <p className="mt-3">
                <strong>Summary:</strong>{" "}
                {result.triage.summary}
              </p>

              <div className="mt-3">
                <strong>Symptoms:</strong>

                <ul className="ml-5 list-disc">
                  {result.triage.symptoms.map(
                    (symptom, index) => (
                      <li key={index}>{symptom}</li>
                    ),
                  )}
                </ul>
              </div>
            </section>

            <section className="border-2 border-black p-5">
              <h2 className="text-xl font-bold">
                Diagnosis
              </h2>

              <p className="mt-3">
                <strong>Likely Root Cause:</strong>{" "}
                {result.diagnosis.likely_root_cause}
              </p>

              <p>
                <strong>Confidence:</strong>{" "}
                {result.diagnosis.confidence}
              </p>

              <p className="mt-3">
                <strong>Explanation:</strong>{" "}
                {result.diagnosis.explanation}
              </p>

              <div className="mt-3">
                <strong>Evidence:</strong>

                <ul className="ml-5 list-disc">
                  {result.diagnosis.evidence.map(
                    (item, index) => (
                      <li key={index}>{item}</li>
                    ),
                  )}
                </ul>
              </div>
            </section>

            <section className="border-2 border-black p-5">
              <h2 className="text-xl font-bold">
                Resolution
              </h2>

              <div className="mt-3">
                <strong>Recommended Actions:</strong>

                <ul className="ml-5 list-disc">
                  {result.resolution.recommended_actions.map(
                    (action, index) => (
                      <li key={index}>{action}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-4">
                <strong>Verification Steps:</strong>

                <ul className="ml-5 list-disc">
                  {result.resolution.verification_steps.map(
                    (step, index) => (
                      <li key={index}>{step}</li>
                    ),
                  )}
                </ul>
              </div>

              <div className="mt-4">
                <strong>Safety Notes:</strong>

                <ul className="ml-5 list-disc">
                  {result.resolution.safety_notes.map(
                    (note, index) => (
                      <li key={index}>{note}</li>
                    ),
                  )}
                </ul>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}