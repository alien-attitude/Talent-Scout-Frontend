// src/pages/LoginPage.tsx

import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UsersIcon, Loader2Icon, AlertCircleIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function LoginPage() {
    const [email, setEmail]       = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState("");

    const { logIn } = useAuth();
    const navigate  = useNavigate();
    const location  = useLocation();

    // Redirect back to the page they came from, or dashboard
    const from = (location.state as any)?.from?.pathname || "/employer/dashboard";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await logIn({ email, password });
            navigate(from, { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="bg-teal-600 p-3 rounded-xl shadow-sm">
                        <UsersIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
                    Sign in to your account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Or{" "}
                    <Link to="/signup" className="font-medium text-teal-600 hover:text-teal-500">
                        create a new employer account
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-slate-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                <div className="flex">
                                    <AlertCircleIcon className="h-5 w-5 text-red-400" />
                                    <p className="ml-3 text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
                                Email address
                            </label>
                            <input
                                id="email" name="email" type="email" autoComplete="email" required
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                id="password" name="password" type="password" autoComplete="current-password" required
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <><Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />Signing in...</>
                            ) : "Sign in"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}