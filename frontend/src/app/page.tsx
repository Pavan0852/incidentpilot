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
      console.error("Incident analysis failed:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to analyze incident. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-background px-4 py-6 text-foreground sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Application Header */}
        <header className="border-3 border-border bg-surface shadow-[6px_6px_0_var(--shadow)]">
          <div className="flex flex-col gap-4 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em]">
                AI INCIDENT RESPONSE SYSTEM
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tight sm:text-4xl">
                IncidentPilot
              </h1>
            </div>

            <div className="flex items-center gap-3 border-2 border-border bg-green px-3 py-2 font-mono text-xs font-bold uppercase">
              <span className="h-3 w-3 border-2 border-border bg-foreground" />
              System Ready
            </div>
          </div>
        </header>

        {/* Incident Analysis Workspace */}
        <section className="mt-8 border-3 border-border bg-surface shadow-[6px_6px_0_var(--shadow)]">

          <div className="border-b-3 border-border bg-yellow px-5 py-3">
            <h2 className="font-mono text-sm font-black uppercase tracking-wider">
              Incident Analysis Workspace
            </h2>
          </div>

          <div className="space-y-6 p-5">

            {/* Incident Input */}
            <div>
              <label
                htmlFor="incident"
                className="mb-2 block font-mono text-sm font-black uppercase"
              >
                Incident Description
              </label>

              <textarea
                id="incident"
                value={incident}
                onChange={(event) =>
                  setIncident(event.target.value)
                }
                placeholder="Describe the incident..."
                className="min-h-32 w-full resize-y border-3 border-border bg-white p-4 font-mono text-sm outline-none focus:bg-yellow/20"
              />
            </div>

            {/* Logs Input */}
            <div>
              <label
                htmlFor="logs"
                className="mb-2 block font-mono text-sm font-black uppercase"
              >
                Incident Logs
              </label>

              <textarea
                id="logs"
                value={logs}
                onChange={(event) =>
                  setLogs(event.target.value)
                }
                placeholder="Paste relevant logs or error messages here..."
                className="min-h-40 w-full resize-y border-3 border-border bg-white p-4 font-mono text-sm outline-none focus:bg-blue/20"
              />
            </div>

            {/* Analyze Action */}
            <div className="flex justify-end border-t-2 border-border pt-5">
              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="border-3 border-border bg-orange px-6 py-3 font-mono text-sm font-black uppercase shadow-[4px_4px_0_var(--shadow)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Analyzing..."
                  : "Analyze Incident"}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="border-3 border-border bg-danger p-4 font-mono text-sm font-bold">
                ERROR: {error}
              </div>
            )}

          </div>
        </section>

        {/* Temporary Result Output */}
        {result && (
          <section className="mt-8 space-y-8">

            {/* Agent Execution */}
            <section className="border-3 border-border bg-surface shadow-[6px_6px_0_var(--shadow)]">
              <div className="border-b-3 border-border bg-blue px-5 py-3">
                <h2 className="font-mono text-sm font-black uppercase tracking-wider">
                  Agent Execution
                </h2>
              </div>

              <div className="p-5">
                <div className="grid gap-4 md:grid-cols-3">

                  <div className="border-3 border-border bg-green p-4 shadow-[4px_4px_0_var(--shadow)]">
                    <p className="font-mono text-xs font-black uppercase">
                      Agent 01
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-black">
                        Triage
                      </h3>

                      <span className="border-2 border-border bg-surface px-2 py-1 font-mono text-xs font-black">
                        ✓ DONE
                      </span>
                    </div>
                  </div>

                  <div className="border-3 border-border bg-yellow p-4 shadow-[4px_4px_0_var(--shadow)]">
                    <p className="font-mono text-xs font-black uppercase">
                      Agent 02
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-black">
                        Diagnosis
                      </h3>

                      <span className="border-2 border-border bg-surface px-2 py-1 font-mono text-xs font-black">
                        ✓ DONE
                      </span>
                    </div>
                  </div>

                  <div className="border-3 border-border bg-orange p-4 shadow-[4px_4px_0_var(--shadow)]">
                    <p className="font-mono text-xs font-black uppercase">
                      Agent 03
                    </p>

                    <div className="mt-2 flex items-center justify-between gap-3">
                      <h3 className="text-lg font-black">
                        Resolution
                      </h3>

                      <span className="border-2 border-border bg-surface px-2 py-1 font-mono text-xs font-black">
                        ✓ DONE
                      </span>
                    </div>
                  </div>

                </div>

                <div className="mt-5 border-2 border-border bg-surface-muted p-3 text-center font-mono text-xs font-bold uppercase">
                  Workflow completed successfully
                </div>
              </div>
            </section>

            {/* Incident Report */}
            <section className="border-3 border-border bg-surface shadow-[6px_6px_0_var(--shadow)]">

              <div className="border-b-3 border-border bg-teal px-5 py-3">
                <h2 className="font-mono text-sm font-black uppercase tracking-wider">
                  Final Incident Report
                </h2>
              </div>

              <div className="space-y-6 p-5">

                {/* Incident Overview */}
                <div className="grid gap-4 md:grid-cols-3">

                  <div className="border-3 border-border bg-danger p-4">
                    <p className="font-mono text-xs font-black uppercase">
                      Severity
                    </p>

                    <p className="mt-2 text-2xl font-black">
                      {result.triage.severity}
                    </p>
                  </div>

                  <div className="border-3 border-border bg-yellow p-4">
                    <p className="font-mono text-xs font-black uppercase">
                      Category
                    </p>

                    <p className="mt-2 text-lg font-black">
                      {result.triage.category}
                    </p>
                  </div>

                  <div className="border-3 border-border bg-blue p-4">
                    <p className="font-mono text-xs font-black uppercase">
                      Service
                    </p>

                    <p className="mt-2 text-lg font-black">
                      {result.triage.service}
                    </p>
                  </div>

                </div>

                {/* Summary */}
                <div className="border-3 border-border p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Incident Summary
                  </h3>

                  <p className="mt-3 leading-7">
                    {result.triage.summary}
                  </p>
                </div>

                {/* Symptoms */}
                <div className="border-3 border-border p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Observed Symptoms
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {result.triage.symptoms.map(
                      (symptom, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <span className="font-mono font-black">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span>{symptom}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Diagnosis */}
                <div className="border-3 border-border bg-yellow/30 p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Diagnosis
                  </h3>

                  <div className="mt-4 space-y-4">

                    <div>
                      <p className="font-mono text-xs font-black uppercase">
                        Likely Root Cause
                      </p>

                      <p className="mt-1 text-xl font-black">
                        {result.diagnosis.likely_root_cause}
                      </p>
                    </div>

                    <div>
                      <p className="font-mono text-xs font-black uppercase">
                        Confidence
                      </p>

                      <span className="mt-1 inline-block border-2 border-border bg-green px-3 py-1 font-mono text-sm font-black">
                        {result.diagnosis.confidence}
                      </span>
                    </div>

                    <div>
                      <p className="font-mono text-xs font-black uppercase">
                        Explanation
                      </p>

                      <p className="mt-2 leading-7">
                        {result.diagnosis.explanation}
                      </p>
                    </div>

                  </div>
                </div>

                {/* Evidence */}
                <div className="border-3 border-border p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Supporting Evidence
                  </h3>

                  <ul className="mt-3 space-y-2">
                    {result.diagnosis.evidence.map(
                      (evidence, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <span className="font-mono font-black">
                            [{String(index + 1).padStart(2, "0")}]
                          </span>

                          <span>{evidence}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Recommended Actions */}
                <div className="border-3 border-border bg-orange/30 p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Recommended Actions
                  </h3>

                  <ol className="mt-4 space-y-3">
                    {result.resolution.recommended_actions.map(
                      (action, index) => (
                        <li
                          key={index}
                          className="flex gap-4"
                        >
                          <span className="flex h-7 min-w-7 items-center justify-center border-2 border-border bg-orange font-mono text-xs font-black">
                            {String(index + 1).padStart(2, "0")}
                          </span>

                          <span className="pt-1">
                            {action}
                          </span>
                        </li>
                      ),
                    )}
                  </ol>
                </div>

                {/* Verification */}
                <div className="border-3 border-border bg-green/30 p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Verification Steps
                  </h3>

                  <ul className="mt-4 space-y-3">
                    {result.resolution.verification_steps.map(
                      (step, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <span className="border-2 border-border bg-surface px-2 py-1 font-mono text-xs font-black">
                            □
                          </span>

                          <span className="pt-1">
                            {step}
                          </span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                {/* Safety Notes */}
                <div className="border-3 border-border bg-surface-muted p-5">
                  <h3 className="font-mono text-sm font-black uppercase">
                    Safety Notes
                  </h3>

                  <ul className="mt-4 space-y-2">
                    {result.resolution.safety_notes.map(
                      (note, index) => (
                        <li
                          key={index}
                          className="flex gap-3"
                        >
                          <span className="font-mono font-black">
                            !
                          </span>

                          <span>{note}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

              </div>
            </section>
          </section>
        )}
      </div>
    </main>
  );
}

