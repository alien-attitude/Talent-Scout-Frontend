import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { UsersIcon, Loader2Icon, AlertCircleIcon, ArrowLeftIcon } from "lucide-react";
import { verifyOtp } from "../services/api";

export function OtpVerificationPage() {
    const [otp, setOtp]             = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError]         = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    // Email was passed from ForgotPasswordPage via router state
    const email = (location.state as any)?.email || "";

    // If someone lands here without an email, send them back
    if (!email) {
        navigate("/forgot-password", { replace: true });
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!otp.trim() || otp.length !== 6) {
            setError("Please enter the 6-digit OTP");
            return;
        }

        setIsLoading(true);
        try {
            await verifyOtp(email, otp);

            // OTP is valid — pass email and otp to reset password page via state
            navigate("/reset-password", { state: { email, otp } });
        } catch (err: any) {
            setError(err?.response?.data?.error || "Invalid or expired OTP. Please try again.");
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
                    Enter your OTP
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Enter the 6-digit code for{" "}
                    <span className="font-medium">{email}</span>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-slate-200 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="rounded-md bg-red-50 p-4 border border-red-100">
                                <div className="flex">
                                    <AlertCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                                    <p className="ml-3 text-sm font-medium text-red-800">{error}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-slate-700">
                                OTP Code
                            </label>
                            <input
                                id="otp"
                                name="otp"
                                type="text"
                                required
                                maxLength={6}
                                value={otp}
                                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))} // numbers only
                                placeholder="Enter 6-digit code"
                                className="mt-1 appearance-none block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm tracking-widest text-center text-lg"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <><Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />Verifying...</>
                            ) : "Verify OTP"}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link
                            to="/forgot-password"
                            className="inline-flex items-center text-sm font-medium text-slate-600 hover:text-slate-900"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Request a new OTP
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}