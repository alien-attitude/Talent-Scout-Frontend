import React, { useState } from "react";
import { Link } from "react-router-dom";
import { candidatePropType } from "../types/candidate.js";
import { SearchIcon, FilterIcon, ChevronLeftIcon, ChevronRightIcon, LinkedinIcon, FileTextIcon } from "lucide-react";
import PropTypes from "prop-types";

export default function CandidateTable({ candidates }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const normalizedSearch = searchTerm.toLowerCase();

  const filteredCandidates = candidates.filter((candidate) => {
    const fullName = candidate.fullName ?? "";
    const headline = candidate.headline ?? "";
    const skills = Array.isArray(candidate.skills) ? candidate.skills : [];

    const matchesSearch =
      fullName.toLowerCase().includes(normalizedSearch) ||
      headline.toLowerCase().includes(normalizedSearch) ||
      skills.some((skill) =>
        (skill ?? "").toLowerCase().includes(normalizedSearch)
      );

    const matchesStatus =
      statusFilter === "all" || candidate.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredCandidates.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCandidates = filteredCandidates.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "new":
        return "bg-blue-100 text-blue-800";
      case "reviewed":
        return "bg-yellow-100 text-yellow-800";
      case "interviewing":
        return "bg-purple-100 text-purple-800";
      case "hired":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
    return (
        <div className="space-y-4">
            {/* Filters and Search */}
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="Search by name, role, or skills..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />

                </div>
                <div className="flex items-center space-x-2">
                    <FilterIcon className="h-5 w-5 text-gray-400" />
                    <select
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}>

                        <option value="all">All Statuses</option>
                        <option value="new">New</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewing">Interviewing</option>
                        <option value="hired">Hired</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                        <tr>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                Candidate
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                Role / Headline
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                Top Skills
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                Source
                            </th>
                            <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">

                                Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedCandidates.map((candidate) =>
                                <tr
                                    key={candidate.id}
                                    className="hover:bg-gray-50 transition-colors">

                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <img
                                                    className="h-10 w-10 rounded-full object-cover"
                                                    src={candidate.profilePicture}
                                                    alt="" />

                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {candidate.fullName}
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {candidate.location}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-900 max-w-xs truncate">
                                            {candidate.headline}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-1">
                                            {candidate.workExperience[0]?.company ||
                                                'Unknown Company'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-wrap gap-1">
                                            {candidate.skills.slice(0, 2).map((skill, idx) =>
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">

                          {skill}
                        </span>
                                            )}
                                            {candidate.skills.length > 2 &&
                                                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{candidate.skills.length - 2}
                        </span>
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            {candidate.linkedinUrl &&
                                                <LinkedinIcon className="h-4 w-4 text-blue-600" />
                                            }
                                            {candidate.cvFileName &&
                                                <FileTextIcon className="h-4 w-4 text-gray-600" />
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                    <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(candidate.status)}`}>

                      {candidate.status.charAt(0).toUpperCase() +
                          candidate.status.slice(1)}
                    </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link
                                            to={`/candidate/${candidate.id}`}
                                            className="text-blue-600 hover:text-blue-900">

                                            View Profile
                                        </Link>
                                    </td>
                                </tr>
                        )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm text-gray-700">
                                Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                                <span className="font-medium">
                  {Math.min(
                      startIndex + itemsPerPage,
                      filteredCandidates.length
                  )}
                </span>{' '}
                                of{' '}
                                <span className="font-medium">{filteredCandidates.length}</span>{' '}
                                results
                            </p>
                        </div>
                        <div>
                            <nav
                                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                aria-label="Pagination">

                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">

                                    <span className="sr-only">Previous</span>
                                    <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                                {Array.from({
                                    length: totalPages
                                }).map((_, idx) =>
                                    <button
                                        key={idx}
                                        onClick={() => setCurrentPage(idx + 1)}
                                        className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${currentPage === idx + 1 ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'}`}>

                                        {idx + 1}
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                                    }
                                    disabled={currentPage === totalPages}
                                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">

                                    <span className="sr-only">Next</span>
                                    <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

CandidateTable.propTypes = {
  candidates: PropTypes.arrayOf(candidatePropType).isRequired,
};