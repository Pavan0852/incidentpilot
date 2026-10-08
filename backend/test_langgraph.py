from typing import TypedDict

from langgraph.graph import END, START, StateGraph


class DemoState(TypedDict):
    message: str


def first_node(state: DemoState):
    return {
        "message": state["message"] + " → First Node"
    }


def second_node(state: DemoState):
    return {
        "message": state["message"] + " → Second Node"
    }


graph_builder = StateGraph(DemoState)

graph_builder.add_node("first", first_node)
graph_builder.add_node("second", second_node)

graph_builder.add_edge(START, "first")
graph_builder.add_edge("first", "second")
graph_builder.add_edge("second", END)

graph = graph_builder.compile()


result = graph.invoke(
    {
        "message": "START"
    }
)


print(result)