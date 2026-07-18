import { describe, expect, it } from "vitest";
import { prerequisiteClosure, unresolvedPrerequisites } from "@/lib/curriculum/knowledge-graph";

describe("knowledge graph prerequisite resolution", () => {
  it("finds the prerequisite chain before EPI gas ratio", () => {
    const chain = prerequisiteClosure("epi-gas-ratio").map((node) => node.id);

    expect(chain).toContain("math-ratio");
    expect(chain).toContain("eng-unit-conversion");
    expect(chain).toContain("chem-concentration");
  });

  it("returns unresolved prerequisites under mastery threshold", () => {
    const unresolved = unresolvedPrerequisites("epi-gas-ratio", {
      "math-positive-negative": 90,
      "math-fractions": 90
    }).map((node) => node.id);

    expect(unresolved).toContain("math-ratio");
    expect(unresolved).toContain("chem-concentration");
  });
});
