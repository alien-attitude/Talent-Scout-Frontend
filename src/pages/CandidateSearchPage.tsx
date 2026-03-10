import React, { useState } from 'react';
import { Navbar2 } from '../components/Navbar2';
import { CandidateTable } from '../components/CandidateTable';
import { useCandidates } from '../contexts/CandidatesContext';
import { Link } from 'react-router-dom';
import { UserPlusIcon, SearchIcon, Loader2Icon, ArrowLeftIcon } from 'lucide-react';

type ViewState = 'idle' | 'searching' | 'results';

export function CandidateSearchPage() {
    const { candidates, isLoading, refetch } = useCandidates();
    const [viewState,   setViewState]   = useState<ViewState>('idle');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setViewState('searching');
        // ← real backend search via refetch with search param
        await refetch({ search: searchQuery.trim() });
        setViewState('results');
    };

    const handleViewAll = async () => {
        setSearchQuery('');
        setViewState('searching');
        await refetch(); // no search param = fetch all
        setViewState('results');
    };

    const handleClearSearch = async () => {
        setSearchQuery('');
        setViewState('idle');
        await refetch(); // reset back to full list
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar2 />
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
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-900">Candidate Search</h1>
                        <Link to="/submit"
                              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 transition-colors">
                            <UserPlusIcon className="h-4 w-4 mr-2" />
                            Add Candidate
                        </Link>
                    </div>

                    {/* IDLE */}
                    {viewState === 'idle' && (
                        <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                            <div className="w-full max-w-2xl text-center space-y-8">
                                <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
                                    <SearchIcon className="h-12 w-12 text-teal-600" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                                    Find your next hire
                                </h2>
                                <p className="text-lg text-slate-500 max-w-xl mx-auto">
                                    Search through your candidate database by name, role, or specific skills.
                                </p>
                                <form onSubmit={handleSearch} className="mt-8 sm:flex justify-center max-w-xl mx-auto">
                                    <div className="relative rounded-md shadow-sm flex-grow">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="h-5 w-5 text-slate-400" />
                                        </div>
                                        <input type="text"
                                               className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-lg border-slate-300 rounded-l-md py-4"
                                               placeholder="e.g. React Developer, Product Manager..."
                                               value={searchQuery}
                                               onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" disabled={!searchQuery.trim()}
                                            className="mt-3 w-full sm:mt-0 sm:w-auto inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-r-md text-white bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                        Search
                                    </button>
                                </form>
                                <div className="pt-4">
                                    <p className="text-sm text-slate-400">
                                        Or{' '}
                                        <button onClick={handleViewAll} className="text-teal-600 hover:underline font-medium">
                                            view all candidates
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LOADING */}
                    {viewState === 'searching' && (
                        <div className="flex flex-col items-center justify-center py-32">
                            <Loader2Icon className="h-12 w-12 text-teal-600 animate-spin mb-4" />
                            <h3 className="text-lg font-medium text-slate-900">Searching candidates...</h3>
                            <p className="text-slate-500">Looking for matches for "{searchQuery || 'all candidates'}"</p>
                        </div>
                    )}

                    {/* RESULTS */}
                    {viewState === 'results' && (
                        <div className="space-y-6">
                            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                                <div className="flex items-center w-full sm:w-auto">
                                    <button onClick={handleClearSearch}
                                            className="mr-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors">
                                        <ArrowLeftIcon className="h-5 w-5" />
                                    </button>
                                    <div>
                                        <h2 className="text-lg font-semibold text-slate-900">Search Results</h2>
                                        <p className="text-sm text-slate-500">
                                            Found {candidates.length} match{candidates.length !== 1 ? 'es' : ''} for "{searchQuery || 'all'}"
                                        </p>
                                    </div>
                                </div>
                                <form onSubmit={handleSearch} className="flex w-full sm:w-auto sm:max-w-md flex-1">
                                    <div className="relative rounded-md shadow-sm flex-grow">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <SearchIcon className="h-4 w-4 text-slate-400" />
                                        </div>
                                        <input type="text"
                                               className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2"
                                               placeholder="Refine search..."
                                               value={searchQuery}
                                               onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit"
                                            className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700">
                                        Search
                                    </button>
                                </form>
                            </div>

                            {isLoading ? (
                                <div className="flex justify-center py-10">
                                    <Loader2Icon className="h-8 w-8 text-teal-600 animate-spin" />
                                </div>
                            ) : candidates.length > 0 ? (
                                <CandidateTable candidates={candidates} />
                            ) : (
                                <div className="text-center py-16 bg-white rounded-lg border border-slate-200 border-dashed">
                                    <SearchIcon className="mx-auto h-12 w-12 text-slate-300" />
                                    <h3 className="mt-2 text-sm font-medium text-slate-900">No candidates found</h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        We couldn't find any candidates matching "{searchQuery}".
                                    </p>
                                    <button onClick={handleClearSearch}
                                            className="mt-6 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200">
                                        Clear search
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}