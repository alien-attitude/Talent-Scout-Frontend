import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    UsersIcon,
    MailIcon,
    Loader2Icon,
    AlertCircleIcon,
    ArrowLeftIcon } from
        'lucide-react';
import { forgotPassword } from '../services/api';
export function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email.trim()) {
            setError("Please enter your email address");
            return;
        }
        setIsLoading(true);
        try {
            const response = await forgotPassword(email);

            // Show OTP in alert — dev/testing only
            // In production this would be sent via email/SMS instead
            alert(
                `Your OTP is: ${response.otp}\n\nThis code expires in ${response.expiresInSeconds} seconds.\n`
            );

            // Redirect to OTP verification page, passing email via state
            navigate("/verify-otp", { state: { email } });
        } catch (err: any) {
            setError(err?.response?.data?.error || "Something went wrong. Please try again.");
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
                <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
                    Forgot your password?
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Enter your email and we'll send you a reset message.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-slate-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error &&
                            <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                <div className="flex">
                                    <AlertCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    <p className="ml-3 text-sm font-medium text-red-800">
                                        {error}
                                    </p>
                                </div>
                            </div>
                        }

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-slate-700">

                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MailIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="appearance-none block w-full pl-10 px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                    placeholder="you@company.com" />

                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">

                            {isLoading ?
                                <>
                                    <Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />
                                    Sending...
                                </> :

                                'Send reset message'
                            }
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/login"
                            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900">

                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Back to login
                        </Link>
                    </div>
                </div>
            </div>
        </div>);

}