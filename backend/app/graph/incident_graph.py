from langgraph.graph import END, START, StateGraph

from app.agents.diagnosis_agent import DiagnosisAgent
from app.agents.resolution_agent import ResolutionAgent
from app.agents.triage_agent import TriageAgent
from app.state.incident_state import IncidentState

triage_agent = TriageAgent()
diagnosis_agent = DiagnosisAgent()
resolution_agent = ResolutionAgent()


def triage_node(state: IncidentState):
    triage_result = triage_agent.analyze(
        incident=state.incident,
        logs=state.logs,
    )

    return {"triage": triage_result}


def diagnosis_node(state: IncidentState):
    diagnosis_result = diagnosis_agent.analyze(
        incident=state.incident,
        logs=state.logs,
        triage=state.triage,
    )

    return {"diagnosis": diagnosis_result}


def resolution_node(state: IncidentState):
    resolution_result = resolution_agent.analyze(
        incident=state.incident,
        logs=state.logs,
        triage=state.triage,
        diagnosis=state.diagnosis,
    )

    return {"resolution": resolution_result}


graph_builder = StateGraph(IncidentState)

graph_builder.add_node("triage", triage_node)
graph_builder.add_node("diagnosis", diagnosis_node)
graph_builder.add_node("resolution", resolution_node)

graph_builder.add_edge(START, "triage")
graph_builder.add_edge("triage", "diagnosis")
graph_builder.add_edge("diagnosis", "resolution")
graph_builder.add_edge("resolution", END)

incident_graph = graph_builder.compile()