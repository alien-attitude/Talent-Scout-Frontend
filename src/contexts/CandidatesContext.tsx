// src/contexts/CandidatesContext.tsx

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { CandidateProfile, CandidateListResponse } from "../types/candidate";
import { fetchCandidates } from "../services/api";

interface CandidatesContextValue {
    candidates:       CandidateProfile[];
    isLoading:        boolean;
    error:            string | null;
    pagination:       CandidateListResponse["pagination"] | null;
    refetch:          (params?: { search?: string; page?: number; status?: string }) => Promise<void>;
    getCandidateById: (id: string) => CandidateProfile | undefined;
}

const CandidatesContext = createContext<CandidatesContextValue | null>(null);

export function CandidatesProvider({ children }: { children: ReactNode }) {
    const [candidates, setCandidates] = useState<CandidateProfile[]>([]);
    const [pagination, setPagination] = useState<CandidateListResponse["pagination"] | null>(null);
    const [isLoading, setIsLoading]   = useState(true);
    const [error, setError]           = useState<string | null>(null);

    const refetch = useCallback(async (params?: {
        search?: string;
        page?:   number;
        status?: string;
    }) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetchCandidates(params);
            setCandidates(response.candidates);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to load candidates.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Load candidates on mount
    useEffect(() => {
        refetch();
    }, [refetch]);

    const getCandidateById = useCallback(
        (id: string) => candidates.find((c) => c._id === id),
        [candidates]
    );

    return (
        <CandidatesContext.Provider
            value={{ candidates, isLoading, error, pagination, refetch, getCandidateById }}
        >
            {children}
        </CandidatesContext.Provider>
    );
}

export function useCandidates(): CandidatesContextValue {
    const ctx = useContext(CandidatesContext);
    if (!ctx) throw new Error("useCandidates must be used within CandidatesProvider");
    return ctx;
}