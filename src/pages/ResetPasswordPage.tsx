import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { UsersIcon, LockIcon, Loader2Icon, AlertCircleIcon,
    CheckCircleIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { resetPassword } from "../services/api";

export function ResetPasswordPage() {
    const [newPassword,      setNewPassword]      = useState("");
    const [confirmPassword,  setConfirmPassword]  = useState("");
    const [showNewPassword,  setShowNewPassword]  = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading,        setIsLoading]        = useState(false);
    const [error,            setError]            = useState("");
    const [isSuccess,        setIsSuccess]        = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Email and OTP passed from OtpVerificationPage via router state
    const email = (location.state as any)?.email || "";
    const otp   = (location.state as any)?.otp   || "";

    // If someone lands here without completing OTP step, send them back
    if (!email || !otp) {
        navigate("/forgot-password", { replace: true });
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            return;
        }
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);
        try {
            await resetPassword(email, otp, newPassword);
            setIsSuccess(true);
        } catch (err: any) {
            setError(err?.response?.data?.error || "Failed to reset password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow-sm sm:rounded-xl border border-slate-200 sm:px-10">
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                                <CheckCircleIcon className="h-6 w-6 text-green-600" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">
                                Password reset successful
                            </h2>
                            <p className="text-sm text-slate-600 mb-6">
                                Your password has been updated. You can now sign in.
                            </p>
                            <button
                                onClick={() => navigate("/login")}
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                            >
                                Go to login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="bg-teal-600 p-3 rounded-xl shadow-sm">
                        <UsersIcon className="h-8 w-8 text-white" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-2xl font-bold text-slate-900">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Enter your new password below
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
                            <label htmlFor="newPassword" className="block text-sm font-medium text-slate-700">
                                New password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="newPassword" name="newPassword"
                                    type={showNewPassword ? "text" : "password"}
                                    required value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    placeholder="Min. 8 characters"
                                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                                <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showNewPassword
                                        ? <EyeOffIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                        : <EyeIcon    className="h-5 w-5 text-slate-400 hover:text-slate-600" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700">
                                Confirm new password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <LockIcon className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    id="confirmPassword" name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Re-enter password"
                                    className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                />
                                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                    {showConfirmPassword
                                        ? <EyeOffIcon className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                                        : <EyeIcon    className="h-5 w-5 text-slate-400 hover:text-slate-600" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit" disabled={isLoading}
                            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
                        >
                            {isLoading ? (
                                <><Loader2Icon className="animate-spin -ml-1 mr-2 h-5 w-5" />Resetting...</>
                            ) : "Reset password"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}