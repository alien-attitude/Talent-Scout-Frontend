import React from 'react';
import { useParams, Link, } from 'react-router-dom';
import { ProfileDetail } from '../components/ProfileDetail.jsx';
import { useCandidates } from '../context/CandidatesContext.jsx';
import { ArrowLeftIcon, Loader2Icon } from 'lucide-react';

export function ProfileDetailPage() {

    const { id } = useParams();
    const { getCandidateById, isLoading } = useCandidates();
    const candidate = id ? getCandidateById(id) : undefined;
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2Icon className="h-8 w-8 animate-spin text-teal-600" />
            </div>);

    }
    if (!candidate) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Candidate not found
                    </h2>
                    <p className="mt-2 text-slate-500">
                        This profile may not have been submitted yet.
                    </p>
                    <Link
                        to="/dashboard"
                        className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800">

                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Dashboard
                    </Link>
                </div>
            </div>);

    }
    return (
        <div className="min-h-screen bg-slate-50">
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6">
                        <Link
                            to="/dashboard"
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors">

                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Back to Dashboard
                        </Link>
                    </div>
                    <ProfileDetail candidate={candidate} />
                </div>
            </main>
        </div>);

}