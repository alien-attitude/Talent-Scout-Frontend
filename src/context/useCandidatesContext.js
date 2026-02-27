import { createContext, useContext } from 'react';

export const CandidatesContext = createContext(null)

export function useCandidates() {
    const ctx = useContext(CandidatesContext);
    if (!ctx) {
        throw new Error("useCandidates must be used within CandidatesProvider");
    }
    return ctx;
}