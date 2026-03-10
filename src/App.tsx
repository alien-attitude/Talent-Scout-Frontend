import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet } from
        'react-router-dom';
import { CandidatesProvider } from './contexts/CandidatesContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { CandidateSearchPage } from "./pages/CandidateSearchPage.tsx";
import { DashboardPage } from './pages/DashboardPage';
import { SubmissionPage } from './pages/SubmissionPage';
import { ProfileDetailPage } from './pages/ProfileDetailPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { ResetPasswordPage } from './pages/ResetPasswordPage';
import { EmployerDashboardPage } from './pages/EmployerDashboardPage';
import { OtpVerificationPage } from './pages/OtpVerificationPage';

function CandidateLayout() {
    return (
        <CandidatesProvider>
            <div className="min-h-screen bg-slate-50">
                <Outlet />
            </div>
        </CandidatesProvider>);

}
export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    {/* Public Routes */}

                    <Route
                        path= "/"
                        element={
                            <DashboardPage />
                        }
                    />

                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/verify-otp"      element={<OtpVerificationPage />} />

                    {/* Protected Employer Dashboard */}
                    <Route
                        path="/employer/dashboard"
                        element={
                            <ProtectedRoute>
                                <EmployerDashboardPage />
                            </ProtectedRoute>
                        } />


                    {/* Protected Candidate Routes — shared CandidatesProvider + Navbar */}
                    <Route
                        element={
                            <ProtectedRoute>
                                <CandidateLayout />
                            </ProtectedRoute>
                        }>
                        <Route
                            path= "/candidate-search"
                            element={
                                <CandidatesProvider>
                                    <CandidateSearchPage />
                                </CandidatesProvider>
                            }
                        />

                        <Route path="/submit" element={<SubmissionPage />} />
                        <Route path="/candidate/:id" element={<ProfileDetailPage />} />
                    </Route>

                    {/* Fallback */}
                    <Route
                        path="*"
                        element={<Navigate to="/employer/dashboard" replace />} />

                </Routes>
            </AuthProvider>
        </BrowserRouter>);

}