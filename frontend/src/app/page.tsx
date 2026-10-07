"use client";

import { useState } from "react";
import { checkBackendHealth } from "@/lib/api";

export default function Home() {
  const [status, setStatus] = useState("Not connected");

  async function testBackend() {
    try {
      const result = await checkBackendHealth();
      setStatus(`${result.service} — ${result.status}`);
    } catch {
      setStatus("Backend unavailable");
    }
  }

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">
        IncidentPilot
      </h1>

      <p className="mt-2">
        Multi-Agent Incident Analysis System
      </p>

      <button
        onClick={testBackend}
        className="mt-6 border-2 border-black px-5 py-3"
      >
        Test Backend
      </button>

      <p className="mt-4">
        Status: {status}
      </p>
    </main>
  );
}