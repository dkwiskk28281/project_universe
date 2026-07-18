import { NextResponse } from "next/server";
import { knowledgeNodes } from "@/lib/curriculum/knowledge-graph";

export async function GET() {
  return NextResponse.json({
    schemaVersion: "knowledge-map-v1",
    nodes: knowledgeNodes,
    edges: knowledgeNodes.flatMap((node) => node.prerequisites.map((source) => ({ source, target: node.id, type: "prerequisite" })))
  });
}
