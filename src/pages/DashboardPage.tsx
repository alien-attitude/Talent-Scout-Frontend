import { Link } from 'react-router-dom';
import { Navbar} from "../components/Navbar.tsx";
import {
    UserPlusIcon,
    SearchIcon,
} from
        'lucide-react';

export function DashboardPage() {
    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header with Add Candidate Action - Always visible */}
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">
                            Candidate Search
                        </h1>
                        <Link
                            to="/submit"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">

                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Add Candidate
                        </Link>
                    </div>

                    {/* IDLE STATE */}

                    <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                        <div className="w-full max-w-2xl text-center space-y-8">
                            <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
                                <SearchIcon className="h-12 w-12 text-teal-600" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                                Find your next hire
                            </h2>
                            <p className="text-lg text-slate-500 max-w-xl mx-auto">
                                Search through your candidate database by name, role, or
                                specific skills to find the perfect match.
                            </p>


                        </div>
                    </div>

                </div>
            </main>
        </div>);

}