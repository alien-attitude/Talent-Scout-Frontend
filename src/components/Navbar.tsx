import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    UsersIcon,
    UserPlusIcon,
    LayoutDashboardIcon,
    LogOutIcon } from
        'lucide-react';
import { useAuth } from '../contexts/AuthContext';
export function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const { employer, logOut, isAuthenticated } = useAuth();
    const handleLogout = () => {
        logOut();
        navigate('/login');
    };
    // Don't show navbar on auth pages
    if (location.pathname === '/login' || location.pathname === '/signup') {
        return null;
    }
    return (
        <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <div className="flex-shrink-0 flex items-center">
                            <div className="bg-teal-600 p-2 rounded-lg">
                                <UsersIcon className="h-6 w-6 text-white" />
                            </div>
                            <span className="ml-3 text-xl font-bold text-slate-900">
                TalentScout
              </span>
                        </div>
                        {isAuthenticated &&
                            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                                <Link
                                    to="/"
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${location.pathname === '/' ? 'border-teal-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>

                                    <LayoutDashboardIcon className="w-4 h-4 mr-2" />
                                    Dashboard
                                </Link>
                                <Link
                                    to="/submit"
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${location.pathname === '/submit' ? 'border-teal-500 text-slate-900' : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'}`}>

                                    <UserPlusIcon className="w-4 h-4 mr-2" />
                                    Add Candidate
                                </Link>
                            </div>
                        }
                    </div>
                    <div className="flex items-center">
                        {isAuthenticated ?
                            <div className="flex items-center space-x-4">
                                <div className="hidden md:flex flex-col items-end">
                  <span className="text-sm font-medium text-slate-900">
                    {employer?.firstname}
                  </span>
                                    <span className="text-xs text-slate-500">
                    {employer?.companyname}
                  </span>
                                </div>
                                <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold border border-teal-200">
                                    {employer?.firstname?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                                    title="Log out">

                                    <LogOutIcon className="h-5 w-5" />
                                </button>
                            </div> :

                            <div className="flex space-x-4">
                                <Link
                                    to="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-slate-900 px-3 py-2">

                                    Log in
                                </Link>
                                <Link
                                    to="/signup"
                                    className="text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md transition-colors">

                                    Sign up
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isAuthenticated &&
                <div className="sm:hidden border-t border-slate-200">
                    <div className="pt-2 pb-3 space-y-1">
                        <Link
                            to="/"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${location.pathname === '/' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'}`}>

                            Dashboard
                        </Link>
                        <Link
                            to="/submit"
                            className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${location.pathname === '/submit' ? 'bg-teal-50 border-teal-500 text-teal-700' : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'}`}>

                            Add Candidate
                        </Link>
                    </div>
                </div>
            }
        </nav>);

}