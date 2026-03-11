// src/contexts/AuthContext.tsx

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import type { Employer, SignUpPayload, LoginPayload, AuthContextType } from "../types/auth";
import { signup as apiSignUp, login as apiLogIn, logout as apiLogOut } from "../services/api";
import api from "../libs/axios";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [employer, setEmployer] = useState<Employer | null>(null);
    const [loading, setLoading]   = useState<boolean>(true);

    // On app load — check if a valid session cookie already exists
    // by calling /auth/me. If the cookie is there, backend returns the employer.
    useEffect(() => {
        const checkSession = async () => {
            try {
                const { data } = await api.get("/auth/me");
                setEmployer(data.employer);
            } catch {
                // No valid cookie — user needs to log in
                setEmployer(null);
            } finally {
                setLoading(false);
            }
        };

        checkSession();
    }, []);

    const signUp = async (payload: SignUpPayload) => {
        const response = await apiSignUp(payload);
        // Cookie is set automatically by the backend response
        // We just update local state with the returned employer
        setEmployer(response.data.employer);
    };

    const logIn = async (payload: LoginPayload) => {
        const response = await apiLogIn(payload);
        setEmployer(response.data.employer);
    };

    const logOut = async () => {
        await apiLogOut();
        setEmployer(null);
    };

    return (
        <AuthContext.Provider value={{ employer, loading, isAuthenticated: !! employer, signUp, logIn, logOut }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}