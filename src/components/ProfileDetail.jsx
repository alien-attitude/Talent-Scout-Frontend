import React from 'react';
import propTypes from 'prop-types';
import { MapPinIcon, MailIcon, PhoneIcon, LinkedinIcon, FileTextIcon, BriefcaseIcon,
    GraduationCapIcon, AwardIcon, ExternalLinkIcon, CalendarIcon, DownloadIcon } from 'lucide-react';
import { candidatePropType} from "../types/candidate.js";

export function ProfileDetail({ candidate }) {
    return (
        <div className="bg-white shadow-sm rounded-lg overflow-hidden border border-gray-200">
            {/* Header */}
            <div className="bg-white p-6 sm:p-8 border-b border-gray-200">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                            <img
                                className="mx-auto h-24 w-24 rounded-full object-cover border-4 border-white shadow-sm"
                                src={candidate.profilePicture}
                                alt={candidate.fullName} />

                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                            <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                                {candidate.fullName}
                            </p>
                            <p className="text-sm font-medium text-gray-600">
                                {candidate.headline}
                            </p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap sm:space-x-4 text-sm text-gray-500">
                                <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0">
                                    <MapPinIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {candidate.location}
                                </div>
                                <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0">
                                    <MailIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {candidate.email}
                                </div>
                                <div className="flex items-center justify-center sm:justify-start mt-1 sm:mt-0">
                                    <PhoneIcon className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                                    {candidate.phone}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                        <div className="flex space-x-3">
                            {candidate.linkedinUrl &&
                                <a
                                    href={candidate.linkedinUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">

                                    <LinkedinIcon className="-ml-1 mr-2 h-4 w-4 text-blue-600" />
                                    LinkedIn
                                </a>
                            }
                            {candidate.cvFileName &&
                                <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                                    <DownloadIcon className="-ml-1 mr-2 h-4 w-4" />
                                    Download CV
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:divide-x lg:divide-gray-200">
                {/* Main Content */}
                <div className="lg:col-span-2 p-6 sm:p-8 space-y-8">
                    {/* About */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4">About</h3>
                        <p className="text-gray-600 leading-relaxed">{candidate.bio}</p>
                    </section>

                    {/* Experience */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <BriefcaseIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Work Experience
                        </h3>
                        <div className="space-y-6">
                            {candidate.workExperience.map((job) =>
                                    <div
                                        key={job.id}
                                        className="relative pl-4 border-l-2 border-gray-200">

                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="text-base font-semibold text-gray-900">
                                                    {job.role}
                                                </h4>
                                                <p className="text-sm font-medium text-blue-600">
                                                    {job.company}
                                                </p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {job.duration}
                    </span>
                                        </div>
                                        <p className="mt-2 text-sm text-gray-600">
                                            {job.description}
                                        </p>
                                        <div className="mt-2">
                    <span
                        className={`inline-flex items-center text-xs text-gray-400 ${job.source === 'linkedin' ? 'text-blue-400' : 'text-orange-400'}`}>

                      Source: {job.source === 'linkedin' ? 'LinkedIn' : 'CV'}
                    </span>
                                        </div>
                                    </div>
                            )}
                        </div>
                    </section>

                    {/* Education */}
                    <section>
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <GraduationCapIcon className="h-5 w-5 mr-2 text-gray-400" />
                            Education
                        </h3>
                        <div className="space-y-4">
                            {candidate.education.map((edu) =>
                                <div
                                    key={edu.id}
                                    className="flex justify-between items-start p-4 bg-gray-50 rounded-lg">

                                    <div>
                                        <h4 className="text-base font-semibold text-gray-900">
                                            {edu.institution}
                                        </h4>
                                        <p className="text-sm text-gray-600">
                                            {edu.degree}, {edu.field}
                                        </p>
                                    </div>
                                    <span className="text-sm text-gray-500">{edu.year}</span>
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="p-6 sm:p-8 bg-gray-50 lg:bg-white space-y-8">
                    {/* Skills */}
                    <section>
                        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                            Skills
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {candidate.skills.map((skill, idx) =>
                                    <span
                                        key={idx}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100">

                  {skill}
                </span>
                            )}
                        </div>
                    </section>

                    {/* Certifications */}
                    {candidate.certifications.length > 0 &&
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4 flex items-center">
                                <AwardIcon className="h-4 w-4 mr-2 text-gray-400" />
                                Certifications
                            </h3>
                            <ul className="space-y-2">
                                {candidate.certifications.map((cert, idx) =>
                                    <li
                                        key={idx}
                                        className="text-sm text-gray-600 flex items-start">

                                        <span className="mr-2 text-blue-500">•</span>
                                        {cert}
                                    </li>
                                )}
                            </ul>
                        </section>
                    }

                    {/* Portfolio */}
                    {candidate.portfolioLinks.length > 0 &&
                        <section>
                            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                                Portfolio
                            </h3>
                            <ul className="space-y-3">
                                {candidate.portfolioLinks.map((link, idx) =>
                                    <li key={idx}>
                                        <a
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors">

                                            <ExternalLinkIcon className="h-4 w-4 mr-2" />
                                            {link.label}
                                        </a>
                                    </li>
                                )}
                            </ul>
                        </section>
                    }

                    {/* Metadata */}
                    <section className="pt-6 border-t border-gray-200">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                            System Info
                        </h3>
                        <dl className="space-y-2 text-xs">
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Added</dt>
                                <dd className="text-gray-900 font-medium">
                                    {new Date(candidate.submittedAt).toLocaleDateString()}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Source</dt>
                                <dd className="text-gray-900 font-medium capitalize">
                                    {candidate.primarySource}
                                </dd>
                            </div>
                            <div className="flex justify-between">
                                <dt className="text-gray-500">Status</dt>
                                <dd className="text-gray-900 font-medium capitalize">
                                    {candidate.status}
                                </dd>
                            </div>
                        </dl>
                    </section>
                </div>
            </div>
        </div>);
}

ProfileDetail.propTypes = {
    candidate: propTypes.arrayOf(candidatePropType).isRequired
}