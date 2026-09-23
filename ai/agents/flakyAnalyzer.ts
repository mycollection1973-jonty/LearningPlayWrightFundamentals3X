// Build-over-build flaky analysis. Runs locally (no LLM): a test is flaky when
// its status differs between the previous and the current build snapshot.

export interface BuildSummary {
    runId: string;
    tests: Record<string, string>;
}

export interface FlakyResult {
    counts: { flaky: number; failing: number; total: number };
    flaky: string[];
    summary?: string;
}

export async function analyzeFlaky(
    prev: BuildSummary,
    curr: BuildSummary,
    _useLlm: boolean,
): Promise<FlakyResult> {
    const total = Object.keys(curr.tests).length;
    const failing = Object.values(curr.tests).filter(
        (status) => status === 'failed' || status === 'timedOut',
    ).length;
    const flaky = Object.entries(curr.tests)
        .filter(([title, status]) => prev.tests[title] !== undefined && prev.tests[title] !== status)
        .map(([title]) => title);

    return { counts: { flaky: flaky.length, failing, total }, flaky };
}
