import { Navbar2 } from '../components/Navbar2';
import { SubmissionForm } from '../components/SubmissionForm';
import {Link} from "react-router-dom";
import {ArrowLeftIcon} from "lucide-react";

export function SubmissionPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar2/>
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link to="/employer-dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <SubmissionForm />
                </div>
            </main>
        </div>);

}