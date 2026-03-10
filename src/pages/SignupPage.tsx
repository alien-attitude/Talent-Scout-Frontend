// src/pages/SignupPage.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UsersIcon, Loader2Icon, AlertCircleIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export function SignupPage() {
    const [username,    setUsername]    = useState("");
    const [firstname,   setFirstname]   = useState("");
    const [lastname,    setLastname]    = useState("");
    const [companyname, setCompanyname] = useState(""); // ← lowercase, matches backend
    const [email,       setEmail]       = useState("");
    const [password,    setPassword]    = useState("");
    const [isLoading,   setIsLoading]   = useState(false);
    const [error,       setError]       = useState("");

    const { signUp } = useAuth();
    const navigate   = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);
        try {
            await signUp({ username, firstname, lastname, companyname, email, password });
            navigate("/employer/dashboard", { replace: true });
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to create account. Please try again.");
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
                    Create an employer account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="font-medium text-teal-600 hover:text-teal-500">

                        Sign in
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-slate-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error &&
                            <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <AlertCircleIcon
                                            className="h-5 w-5 text-red-400"
                                            aria-hidden="true" />

                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            {error}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        }

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700">

                                username
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700">

                                First Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={firstname}
                                    onChange={(e) => setFirstname(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-medium text-slate-700">

                                Last Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={lastname}
                                    onChange={(e) => setLastname(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="companyName"
                                className="block text-sm font-medium text-slate-700">

                                Company Name
                            </label>
                            <div className="mt-1">
                                <input
                                    id="companyName"
                                    name="companyName"
                                    type="text"
                                    required
                                    value={companyname}
                                    onChange={(e) => setCompanyname(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700">

                                Work Email
                            </label>
                            <div className="mt-1">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-slate-700">

                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm" />

                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">

                                {isLoading ?
                                    <>
                                        <Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                        Creating account...
                                    </> :

                                    'Create account'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>);

}