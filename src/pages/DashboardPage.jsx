import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import CandidateTable from "../components/CandidateTable.jsx";
import { useCandidates } from "../context/CandidatesContext.jsx";
import { Link } from "react-router-dom";
import {
  UserPlusIcon,
  SearchIcon,
  Loader2Icon,
  ArrowLeftIcon,
} from "lucide-react";

const VIEW_STATES = {
  IDLE: "idle",
  SEARCHING: "searching",
  RESULTS: "results",
};

export default function DashboardPage() {
  const { candidates } = useCandidates();
  const [viewState, setViewState] = useState(VIEW_STATES.IDLE);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setViewState(VIEW_STATES.SEARCHING);

    // Simulate API network delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const results = candidates.filter(
        (c) =>
          c.fullName.toLowerCase().includes(query) ||
          c.headline.toLowerCase().includes(query) ||
          c.skills.some((skill) => skill.toLowerCase().includes(query))
      );
      setFilteredCandidates(results);
      setViewState(VIEW_STATES.RESULTS);
    }, 1500);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setViewState(VIEW_STATES.IDLE);
    setFilteredCandidates([]);
  };

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
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Add Candidate
              </Link>
            </div>

            {/* IDLE STATE */}
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
                      Search through your candidate database by name, role, or
                      specific skills to find the perfect match.
                    </p>

                    <form
                        onSubmit={handleSearch}
                        className="mt-8 sm:flex justify-center max-w-xl mx-auto"
                    >
                      <div className="relative rounded-md shadow-sm flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-lg border-slate-300 rounded-l-md py-4"
                            placeholder="e.g. React Developer, Product Manager..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button
                          type="submit"
                          disabled={!searchQuery.trim()}
                          className="mt-3 w-full sm:mt-0 sm:w-auto inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-medium rounded-r-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        Search
                      </button>
                    </form>

                    <div className="pt-4">
                      <p className="text-sm text-slate-400">
                        Or{' '}
                        <button
                            onClick={() => {
                              setSearchQuery('')
                              setViewState('searching')
                              setTimeout(() => {
                                setFilteredCandidates(candidates)
                                setViewState('results')
                              }, 800)
                            }}
                            className="text-teal-600 hover:underline font-medium"
                        >
                          view all {candidates.length} candidates
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
            )}

            {/* LOADING STATE */}
            {viewState === 'searching' && (
                <div className="flex flex-col items-center justify-center py-32">
                  <Loader2Icon className="h-12 w-12 text-teal-600 animate-spin mb-4" />
                  <h3 className="text-lg font-medium text-slate-900">
                    Searching candidates...
                  </h3>
                  <p className="text-slate-500">
                    Looking for matches for "{searchQuery || 'all candidates'}"
                  </p>
                </div>
            )}

            {/* RESULTS STATE */}
            {viewState === 'results' && (
                <div className="space-y-6">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center w-full sm:w-auto">
                      <button
                          onClick={handleClearSearch}
                          className="mr-4 p-2 rounded-full hover:bg-slate-100 text-slate-500 transition-colors"
                          title="Back to search"
                      >
                        <ArrowLeftIcon className="h-5 w-5" />
                      </button>
                      <div>
                        <h2 className="text-lg font-semibold text-slate-900">
                          Search Results
                        </h2>
                        <p className="text-sm text-slate-500">
                          Found {filteredCandidates.length} match
                          {filteredCandidates.length !== 1 ? 'es' : ''} for "
                          {searchQuery || 'all'}"
                        </p>
                      </div>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="flex w-full sm:w-auto sm:max-w-md flex-1"
                    >
                      <div className="relative rounded-md shadow-sm flex-grow">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-4 w-4 text-slate-400" />
                        </div>
                        <input
                            type="text"
                            className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2"
                            placeholder="Refine search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <button
                          type="submit"
                          className="ml-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                      >
                        Search
                      </button>
                    </form>
                  </div>

                  {filteredCandidates.length > 0 ? (
                      <CandidateTable candidates={filteredCandidates} />
                  ) : (
                      <div className="text-center py-16 bg-white rounded-lg border border-slate-200 border-dashed">
                        <SearchIcon className="mx-auto h-12 w-12 text-slate-300" />
                        <h3 className="mt-2 text-sm font-medium text-slate-900">
                          No candidates found
                        </h3>
                        <p className="mt-1 text-sm text-slate-500">
                          We couldn't find any candidates matching "{searchQuery}".
                        </p>
                        <div className="mt-6">
                          <button
                              onClick={handleClearSearch}
                              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-teal-700 bg-teal-100 hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                          >
                            Clear search
                          </button>
                        </div>
                      </div>
                  )}
                </div>
            )}
          </div>
        </main>
      </div>
  );
}