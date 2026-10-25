import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";
import { FRASES } from "@/lib/frases";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /gracias instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/gracias");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("offers several different phrases to surprise the visitor with", () => {
    expect(FRASES.length).toBeGreaterThanOrEqual(5);
    expect(new Set(FRASES).size).toBe(FRASES.length);
    expect(FRASES.every((f) => f.trim().length > 20)).toBe(true);
  });
});
