import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ProfileDetail } from '../components/ProfileDetail';
import { fetchCandidateById, deleteCandidate } from '../services/api';
import type { CandidateProfile } from '../types/candidate';
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from 'lucide-react';

export function ProfileDetailPage() {
    const { id } = useParams<{ id: string }>();
    const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error,     setError]     = useState('');

    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (!candidate) return;
        const confirmed = window.confirm(
            `Are you sure you want to delete ${candidate.fullName}'s profile? This cannot be undone.`
        );
        if (!confirmed) return;

        setIsDeleting(true);
        try {
            await deleteCandidate(candidate._id);
            navigate('/candidate-search', { replace: true });
        } catch {
            alert('Failed to delete candidate. Please try again.');
            setIsDeleting(false);
        }
    };

    useEffect(() => {
        if (!id) return;
        const load = async () => {
            setIsLoading(true);
            try {
                const response = await fetchCandidateById(id);
                setCandidate(response.candidate);
            } catch {
                setError('Candidate not found or could not be loaded.');
            } finally {
                setIsLoading(false);
            }
        };
        load();
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2Icon className="h-8 w-8 animate-spin text-teal-600" />
            </div>
        );
    }

    if (error || !candidate) {
        return (
            <div className="min-h-screen bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-center">
                    <h2 className="text-2xl font-bold text-slate-900">Candidate not found</h2>
                    <p className="mt-2 text-slate-500">{error || 'This profile may not exist.'}</p>
                    <Link to="/candidate-search" className="mt-4 inline-flex items-center text-teal-600 hover:text-teal-800">
                        <ArrowLeftIcon className="h-4 w-4 mr-2" />
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <main className="py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-6 flex items-center justify-between">
                        <Link
                            to="/candidate-search"
                            className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-700 transition-colors"
                        >
                            <ArrowLeftIcon className="h-4 w-4 mr-1" />
                            Back to Search
                        </Link>

                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="inline-flex items-center px-3 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-600 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            {isDeleting ? (
                                <><Loader2Icon className="animate-spin h-4 w-4 mr-2" />Deleting...</>
                            ) : (
                                <><Trash2Icon className="h-4 w-4 mr-2" />Delete Candidate</>
                            )}
                        </button>
                    </div>
                    <ProfileDetail candidate={candidate} />
                </div>
            </main>
        </div>
    );
}