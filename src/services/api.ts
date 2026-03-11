// src/services/api.ts

import api from "../libs/axios";
import type { AuthResponse, SignUpPayload, LoginPayload } from "../types/auth";
import type {
    CandidateProfile,
    CandidateListResponse,
    CandidateStats,
} from "../types/candidate";

// Auth
export class ApiError extends Error {
    status: number;

    constructor(status: number, message: string) {
        super(message);
        this.name   = "ApiError";
        this.status = status;
    }
}

export async function signup(payload: SignUpPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/signup", payload);
    return data;
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
    const { data } = await api.post<AuthResponse>("/auth/login", payload);
    return data;
}

export async function logout(): Promise<void> {
    await api.post("/auth/logout");
}

export async function getMe(): Promise<{ employer: CandidateProfile }> {
    const { data } = await api.get("/auth/me");
    return data;
}

export async function forgotPassword(email: string): Promise<{
    success: boolean;
    otp: string;
    email: string;
    expiresInSeconds: number;
}> {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
}

export async function resetPassword(
    email: string,
    otp: string,
    newPassword: string
): Promise<void> {
    await api.post("/auth/reset-password", { email, otp, newPassword });
}

export async function verifyOtp(email: string, otp: string): Promise<void> {
    await api.post("/auth/verify-otp", { email, otp });
}

// Candidates

export async function createCandidate(
    linkedinUrl?: string,
    cvFile?: File
): Promise<{ candidateId: string; jobId: string; status: string }> {
    const formData = new FormData();
    if (linkedinUrl) formData.append("linkedinUrl", linkedinUrl);
    if (cvFile)      formData.append("cv", cvFile);

    const { data } = await api.post("/candidates", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return data;
}

export async function fetchCandidates(params?: {
    page?:   number;
    limit?:  number;
    search?: string;
    status?: string;
    sortBy?: string;
    order?:  "asc" | "desc";
}): Promise<CandidateListResponse> {
    const { data } = await api.get<CandidateListResponse>("/candidates", { params });
    return data;
}

export async function fetchCandidateById(id: string): Promise<{ candidate: CandidateProfile }> {
    const { data } = await api.get<{ candidate: CandidateProfile }>(`/candidates/${id}`);
    return data;
}

export async function fetchCandidateStats(): Promise<CandidateStats> {
    const { data } = await api.get<CandidateStats>("/candidates/stats");
    return data;
}

export async function deleteCandidate(id: string): Promise<void> {
    await api.delete(`/candidates/${id}`);
}

export async function pollCandidateStatus(id: string): Promise<{
    status:   string;
    ready:    boolean;
    progress: { state: string; progress: number } | null;
    candidate: CandidateProfile | null;
}> {
    const { data } = await api.get(`/candidates/${id}/status`);
    return data;
}