import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { CandidateProfile } from '../types/candidate';
import { SearchIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, LinkedinIcon, FileTextIcon, Loader2Icon } from 'lucide-react';
import { deleteCandidate } from '../services/api';
import { useCandidates } from '../contexts/CandidatesContext';

interface CandidateTableProps {
    candidates: CandidateProfile[];
}

export function CandidateTable({ candidates }: CandidateTableProps) {
    const [searchTerm,   setSearchTerm]   = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [currentPage,  setCurrentPage]  = useState(1);
    const itemsPerPage = 5;

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch =
            candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.skills.some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus =
            statusFilter === 'all' || candidate.processingStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const totalPages         = Math.ceil(filteredCandidates.length / itemsPerPage);
    const startIndex         = (currentPage - 1) * itemsPerPage;
    const paginatedCandidates = filteredCandidates.slice(startIndex, startIndex + itemsPerPage);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':   return 'bg-green-100 text-green-800';
            case 'processing':  return 'bg-yellow-100 text-yellow-800';
            case 'pending':     return 'bg-blue-100 text-blue-800';
            case 'failed':      return 'bg-red-100 text-red-800';
            default:            return 'bg-gray-100 text-gray-800';
        }
    };

    const { refetch } = useCandidates();
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (id: string, name: string) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}'s profile? This cannot be undone.`
        );
        if (!confirmed) return;

        setDeletingId(id);
        try {
            await deleteCandidate(id);
            await refetch(); // refresh the list after deletion
        } catch {
            alert('Failed to delete candidate. Please try again.');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                        placeholder="Search by name, headline, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center space-x-2">
                    <FilterIcon className="h-5 w-5 text-gray-400" />
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}>
                        <option value="all">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="completed">Completed</option>
                        <option value="failed">Failed</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            {['Candidate', 'Role / Headline', 'Top Skills', 'Source', 'Status', ''].map((h) => (
                                <th key={h} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {h}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCandidates.map((candidate) => (

                            <tr key={candidate._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <img className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                                             src={candidate.profilePicture || `https://api.dicebear.com/9.x/initials/svg?seed=${candidate.fullName}`}
                                             alt="" />
                                        <div className="ml-4">
                                            <div className="text-sm font-medium text-gray-900">{candidate.fullName}</div>
                                            <div className="text-sm text-gray-500">{candidate.location}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="text-sm text-gray-900 max-w-xs truncate">{candidate.headline}</div>
                                    <div className="text-xs text-gray-500 mt-1">

                                        {candidate.workExperience[0]?.company || 'Unknown Company'}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex flex-wrap gap-1">
                                        {candidate.skills.slice(0, 2).map((skill, idx) => (
                                            <span key={idx} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    {skill}
                                                </span>
                                        ))}
                                        {candidate.skills.length > 2 && (
                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                                                    +{candidate.skills.length - 2}
                                                </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <div className="flex space-x-2">
                                        {candidate.linkedinUrl    && <LinkedinIcon className="h-4 w-4 text-blue-600" />}
                                        {candidate.uploadedFile   && <FileTextIcon className="h-4 w-4 text-gray-600" />}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">

                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.processingStatus)}`}>
                                            {candidate.processingStatus.charAt(0).toUpperCase() + candidate.processingStatus.slice(1)}
                                        </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <div className="flex items-center justify-end gap-4">
                                        <Link
                                            to={`/candidate/${candidate._id}`}
                                            className="text-teal-600 hover:text-teal-900"
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(candidate._id, candidate.fullName)}
                                            disabled={deletingId === candidate._id}
                                            className="text-red-500 hover:text-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                        >
                                            {deletingId === candidate._id ? (
                                                <Loader2Icon className="h-4 w-4 animate-spin" />
                                            ) : (
                                                'Delete'
                                            )}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                            <span className="font-medium">{Math.min(startIndex + itemsPerPage, filteredCandidates.length)}</span>{' '}
                            of <span className="font-medium">{filteredCandidates.length}</span> results
                        </p>
                        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                            <button onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ChevronLeftIcon className="h-5 w-5" />
                            </button>
                            {Array.from({ length: totalPages }).map((_, idx) => (
                                <button key={idx} onClick={() => setCurrentPage(idx + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === idx + 1 ? 'z-10 bg-teal-50 border-teal-500 text-teal-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>
                                    {idx + 1}
                                </button>
                            ))}
                            <button onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                <ChevronRightIcon className="h-5 w-5" />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
}