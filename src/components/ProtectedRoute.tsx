// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Loader2Icon } from "lucide-react";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { employer, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <Loader2Icon className="h-8 w-8 animate-spin text-teal-600" />
            </div>
        );
    }

    if (!employer) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return <>{children}</>;
}