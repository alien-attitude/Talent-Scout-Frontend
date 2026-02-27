import React, {useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import {UploadIcon, LinkedinIcon, FileTextIcon, CheckCircleIcon, AlertCircleIcon,
XIcon, Loader2Icon } from "lucide-react";
import { searchCandidates, ApiError } from "../services/api.js";
import { useCandidates } from "../context/CandidatesContext.jsx";


export function SubmissionForm() {
    const [linkedinUrl, setLinkedinUrl] = useState('');
    const [file, setFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const [status, setStatus] = useState('idle', 'submitting', 'success' , 'error');
    const [errorMessage, setErrorMessage] = useState('');
    const [submittedCandidates, setSubmittedCandidates] = useState(null);
    const { addCandidate } = useCandidates();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const validateLinkedinUrl = (url) => url === '' || url.startsWith('https://www.linkedin.com/in/');
    const handleDragOver = (e) => {e.preventDefault(); setIsDragging(true);};
    const handleDragLeave = (e) => {e.preventDefault(); setIsDragging(false);};
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            validateAndSetFile(file);
        }
    }
    const validateAndSetFile = (f) => {
        const validTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!validTypes.includes(f.type)) {
            setErrorMessage('Invalid file type. Please upload a PDF or Word document.');
            return;
        }
        if (f.size> 5 * 1024 * 1024) {
            setErrorMessage('File size exceeds 5MB. Please upload a smaller file.');
            return;
        }
        setErrorMessage('');
        setFile(f);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('')
        if (!linkedinUrl && !file) {
            setErrorMessage('Please provide either a LinkedIn URL or upload a CV.');
            return;
        }
        if (linkedinUrl && !validateLinkedinUrl(linkedinUrl)) {
            setErrorMessage('Please enter a valid LinkedIn profile URL (e.g. linkedin.com/in/username).');
            return;
        }
        setStatus('submitting');
        try {
            const candidate = await searchCandidates(linkedinUrl, file);
            addCandidate(candidate);
            setSubmittedCandidates(candidate);
            setStatus('success');
            setLinkedinUrl('');
            setFile(null);
        } catch (error) {
            const message =
                error instanceof ApiError ?
                error.message : 'Something went wrong. Please check your connection and try again.';
            setErrorMessage(message);
            setStatus('error');
        }
    };

    if (status === 'success' && submittedCandidates) {
        return (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center max-w-lg mx-auto">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                    <CheckCircleIcon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Profile Submitted!
                </h3>
                <p className="text-slate-500 mb-2">
          <span className="font-semibold text-slate-700">
            {submittedCandidates.fullName}
          </span>
                    's profile has been extracted and saved to the dashboard.
                </p>
                <p className="text-xs text-slate-400 mb-8">
                    Stored locally and ready to view.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => navigate(`/candidate/${submittedCandidates.id}`)}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">

                        View Profile
                    </button>
                    <button
                        onClick={() => {
                            setStatus('idle');
                            setSubmittedCandidates(null);
                        }}
                        className="flex-1 inline-flex items-center justify-center px-6 py-3 border border-slate-200 text-base font-medium rounded-lg text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors">

                        Submit Another
                    </button>
                </div>
            </div>);

    }
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl mx-auto">
            <div className="px-6 py-8 sm:p-10">
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold text-slate-900">
                        Add New Candidate
                    </h2>
                    <p className="mt-2 text-sm text-slate-500">
                        Provide a LinkedIn URL and/or upload a CV. We'll extract and merge
                        the candidate's details automatically.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* LinkedIn URL */}
                    <div>
                        <label
                            htmlFor="linkedin"
                            className="block text-sm font-medium text-slate-700 mb-2">

                            LinkedIn Profile URL
                        </label>
                        <div className="relative rounded-md shadow-sm">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <LinkedinIcon className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="url"
                                id="linkedin"
                                className="focus:ring-teal-500 focus:border-teal-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-3 border"
                                placeholder="https://linkedin.com/in/username"
                                value={linkedinUrl}
                                onChange={(e) => setLinkedinUrl(e.target.value)}
                                disabled={status === 'submitting'} />

                        </div>
                    </div>

                    <div className="relative">
                        <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true">

                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center">
              <span className="px-2 bg-white text-sm text-slate-500">
                AND / OR
              </span>
                        </div>
                    </div>

                    {/* File Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Upload CV / Resume
                        </label>
                        {!file ?
                            <div
                                className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-lg transition-colors ${isDragging ? 'border-teal-500 bg-teal-50' : 'border-slate-300 hover:border-slate-400'}`}
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}>

                                <div className="space-y-1 text-center">
                                    <UploadIcon className="mx-auto h-12 w-12 text-slate-400" />
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label
                                            htmlFor="file-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-teal-600 hover:text-teal-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-teal-500">

                                            <span>Upload a file</span>
                                            <input
                                                id="file-upload"
                                                type="file"
                                                className="sr-only"
                                                ref={fileInputRef}
                                                accept=".pdf,.doc,.docx"
                                                onChange={handleFileChange}
                                                disabled={status === 'submitting'} />

                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">
                                        PDF, DOC, DOCX up to 5MB
                                    </p>
                                </div>
                            </div> :

                            <div className="mt-1 flex items-center justify-between p-4 border border-slate-200 rounded-lg bg-slate-50">
                                <div className="flex items-center space-x-3">
                                    <FileTextIcon className="h-8 w-8 text-teal-500 flex-shrink-0" />
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setFile(null)}
                                    disabled={status === 'submitting'}
                                    className="p-1.5 rounded-full text-slate-400 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500">

                                    <XIcon className="h-5 w-5" />
                                </button>
                            </div>
                        }
                    </div>

                    {(errorMessage || status === 'error') &&
                        <div className="rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <AlertCircleIcon className="h-5 w-5 text-red-400 flex-shrink-0" />
                                <p className="ml-3 text-sm font-medium text-red-800">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    }

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-60 disabled:cursor-not-allowed transition-colors">

                            {status === 'submitting' ?
                                <>
                                    <Loader2Icon className="animate-spin -ml-1 mr-2 h-4 w-4" />
                                    Extracting profile…
                                </> :

                                'Extract & Submit Profile'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>);
}
