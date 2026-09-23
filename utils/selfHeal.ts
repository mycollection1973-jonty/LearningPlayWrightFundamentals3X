// Shape of the `self-heal` attachment a self-healing locator helper sends to
// the reporter's Self-Heal tab.

export interface HealCandidate {
    selector: string;
    strategy: string;
    matchCount: number;
    visible: boolean;
    reasoning: string;
}

export interface RejectedCandidate {
    selector: string;
    reason: string;
}

export interface HealReport {
    failedSelector: string;
    intent: string;
    verified: HealCandidate[];
    rejected: RejectedCandidate[];
    unavailableReason?: string;
}
