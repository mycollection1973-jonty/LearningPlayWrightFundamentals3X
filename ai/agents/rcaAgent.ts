// Root-cause analysis agent. Not wired to an LLM provider in this project,
// so it is only reachable if hasApiKey() ever returns true.

export interface RcaVerdict {
    severity: 'Critical' | 'High' | 'Medium' | 'Low';
    priority: string;
    rootCause: string;
    fixes: string[];
}

export async function analyzeFailure(input: {
    title: string;
    file: string;
    error: string;
    stack?: string;
}): Promise<RcaVerdict> {
    throw new Error(`RCA agent is not configured in this project (${input.title}).`);
}
