import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
    LayoutDashboardIcon,
    SettingsIcon,
    MenuIcon,
    XIcon,
    UsersIcon,
    Loader2Icon,
    CheckCircleIcon,
    AlertCircleIcon,
    LogOutIcon,
    SearchIcon,
    UserPlusIcon } from
        'lucide-react';
type ActiveView = 'dashboard' | 'settings';
export function EmployerDashboardPage() {
    const { employer, logOut } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<ActiveView>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    // Profile form state
    const [formData, setFormData] = useState({
        companyName: employer?.companyname || '',
        contactEmail: employer?.email || '',
        phoneNumber: '',
        companyDescription: ''
    });
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleLogout = async () => {
        await logOut();
        navigate("/login");
    };
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors((prev) => ({
                ...prev,
                [name]: ''
            }));
        }
        setSubmitSuccess(false);
        setSubmitError('');
    };
    const validateForm = () => {
        const errors: Record<string, string> = {};
        if (!formData.companyName.trim()) {
            errors.companyName = 'Company name is required';
        }
        if (!formData.contactEmail.trim()) {
            errors.contactEmail = 'Contact email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.contactEmail)) {
            errors.contactEmail = 'Please enter a valid email address';
        }
        if (formData.phoneNumber && !/^[\d\s\-+()]+$/.test(formData.phoneNumber)) {
            errors.phoneNumber = 'Please enter a valid phone number';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitSuccess(false);
        setSubmitError('');
        if (!validateForm()) return;
        setIsSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setSubmitSuccess(true);
    };
    const sidebarItems = [
        {
            id: 'dashboard' as const,
            label: 'Dashboard',
            icon: LayoutDashboardIcon
        },
        {
            id: 'settings' as const,
            label: 'Profile Settings',
            icon: SettingsIcon
        }];

    const Sidebar = ({ mobile = false }: {mobile?: boolean;}) =>
        <div className={`flex flex-col h-full ${mobile ? '' : 'w-64'}`}>
            {/* Logo */}
            <div className="flex items-center h-16 px-6 border-b border-slate-200">
                <div className="bg-teal-600 p-2 rounded-lg">
                    <UsersIcon className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-lg font-bold text-slate-900">
          Talent Scout
        </span>
                {mobile &&
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="ml-auto p-2 text-slate-400 hover:text-slate-600">

                        <XIcon className="h-5 w-5" />
                    </button>
                }
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-6">
                {/* Employer views */}
                <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Employer
                    </p>
                    {sidebarItems.map((item) =>
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveView(item.id);
                                if (mobile) setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${activeView === item.id ? 'bg-teal-50 text-teal-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}>

                            <item.icon
                                className={`h-5 w-5 mr-3 ${activeView === item.id ? 'text-teal-600' : 'text-slate-400'}`} />

                            {item.label}
                        </button>
                    )}
                </div>

                {/* Candidate routes */}
                <div className="space-y-1">
                    <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        Candidates
                    </p>
                    <Link
                        to="/candidate-search"
                        onClick={() => {
                            if (mobile) setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">

                        <SearchIcon className="h-5 w-5 mr-3 text-slate-400" />
                        Candidate Search
                    </Link>
                    <Link
                        to="/submit"
                        onClick={() => {
                            if (mobile) setIsSidebarOpen(false);
                        }}
                        className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors">

                        <UserPlusIcon className="h-5 w-5 mr-3 text-slate-400" />
                        Add Candidate
                    </Link>
                </div>
            </nav>

            {/* User section */}
            <div className="px-4 py-4 border-t border-slate-200">
                <div className="flex items-center">
                    <div className="h-9 w-9 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-semibold text-sm">
                        {employer?.firstname?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">
                            {employer?.firstname} {employer?.lastname}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                            {employer?.companyname}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Log out">

                        <LogOutIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>;

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="w-64 bg-white border-r border-slate-200">
                    <Sidebar />
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen &&
                <div className="fixed inset-0 z-40 lg:hidden">
                    <div
                        className="fixed inset-0 bg-slate-600 bg-opacity-50"
                        onClick={() => setIsSidebarOpen(false)} />

                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50">
                        <Sidebar mobile />
                    </div>
                </div>
            }

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Header */}
                <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 flex items-center">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 -ml-2 text-slate-500 hover:text-slate-700">

                        <MenuIcon className="h-6 w-6" />
                    </button>
                    <div className="ml-3 flex items-center">
                        <div className="bg-teal-600 p-1.5 rounded-lg">
                            <UsersIcon className="h-4 w-4 text-white" />
                        </div>
                        <span className="ml-2 text-lg font-bold text-slate-900">
              Talent Scout
            </span>
                    </div>
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 lg:p-8 overflow-auto">
                    {activeView === 'dashboard' &&
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                Welcome back, {employer?.firstname || 'Employer'}
                            </h1>
                            <p className="text-slate-600">
                                Manage your company profile and settings from your dashboard.
                            </p>
                        </div>
                    }

                    {activeView === 'settings' &&
                        <div className="max-w-2xl">
                            <h1 className="text-2xl font-bold text-slate-900 mb-6">
                                Profile Settings
                            </h1>

                            <form
                                onSubmit={handleSubmit}
                                className="bg-white rounded-xl border border-slate-200 shadow-sm">

                                <div className="p-6 space-y-6">
                                    {submitSuccess &&
                                        <div className="rounded-lg bg-green-50 p-4 border border-green-100">
                                            <div className="flex">
                                                <CheckCircleIcon className="h-5 w-5 text-green-500 flex-shrink-0" />
                                                <p className="ml-3 text-sm font-medium text-green-800">
                                                    Profile updated successfully
                                                </p>
                                            </div>
                                        </div>
                                    }

                                    {submitError &&
                                        <div className="rounded-lg bg-red-50 p-4 border border-red-100">
                                            <div className="flex">
                                                <AlertCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                                                <p className="ml-3 text-sm font-medium text-red-800">
                                                    {submitError}
                                                </p>
                                            </div>
                                        </div>
                                    }

                                    <div>
                                        <label
                                            htmlFor="companyName"
                                            className="block text-sm font-medium text-slate-700 mb-1">

                                            Company Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            id="companyName"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleInputChange}
                                            className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${formErrors.companyName ? 'border-red-300' : 'border-slate-300'}`}
                                            placeholder="Acme Corporation" />

                                        {formErrors.companyName &&
                                            <p className="mt-1 text-sm text-red-600">
                                                {formErrors.companyName}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="contactEmail"
                                            className="block text-sm font-medium text-slate-700 mb-1">

                                            Contact Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            id="contactEmail"
                                            name="contactEmail"
                                            value={formData.contactEmail}
                                            onChange={handleInputChange}
                                            className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${formErrors.contactEmail ? 'border-red-300' : 'border-slate-300'}`}
                                            placeholder="contact@company.com" />

                                        {formErrors.contactEmail &&
                                            <p className="mt-1 text-sm text-red-600">
                                                {formErrors.contactEmail}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phoneNumber"
                                            className="block text-sm font-medium text-slate-700 mb-1">

                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phoneNumber"
                                            name="phoneNumber"
                                            value={formData.phoneNumber}
                                            onChange={handleInputChange}
                                            className={`block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm ${formErrors.phoneNumber ? 'border-red-300' : 'border-slate-300'}`}
                                            placeholder="+1 (555) 123-4567" />

                                        {formErrors.phoneNumber &&
                                            <p className="mt-1 text-sm text-red-600">
                                                {formErrors.phoneNumber}
                                            </p>
                                        }
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="companyDescription"
                                            className="block text-sm font-medium text-slate-700 mb-1">

                                            Company Description
                                        </label>
                                        <textarea
                                            id="companyDescription"
                                            name="companyDescription"
                                            rows={4}
                                            value={formData.companyDescription}
                                            onChange={handleInputChange}
                                            className="block w-full px-3 py-2.5 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm resize-none"
                                            placeholder="Tell us about your company..." />

                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 rounded-b-xl">
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="inline-flex items-center px-4 py-2.5 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-70 disabled:cursor-not-allowed transition-colors">

                                        {isSubmitting ?
                                            <>
                                                <Loader2Icon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                                Saving...
                                            </> :

                                            'Save changes'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>
                    }
                </main>
            </div>
        </div>);

}