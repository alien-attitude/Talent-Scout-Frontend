/**
 * API Service Layer
 *
 * Set API_BASE_URL to your backend's base URL.
 * All candidate search results are also persisted to localStorage
 * so the app works offline and between sessions.
 */

export const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env &&
    import.meta.env.VITE_API_URL) || 'http://localhost:8080/api/v1';

export class ApiError extends Error {
    constructor(message, status) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
    }
}

async function handleResponse(res) {
  if (!res.ok) {
    let message = `Request failed with status ${res.status}`;
    try {
      const body = await res.json();
      message = body.message || body.detail || message;
    } catch (e) {
      // keep original message if parsing fails
      if (e && e.message) {
        message = e.message;
      }
    }
    throw new ApiError(message, res.status);
  }

  try {
    return await res.json();
  } catch {
    // If backend sometimes returns empty body on success, you can:
    return null;
  }
}

/**
 * Search for a candidate by LinkedIn URL and/or CV file.
 * The backend should return a CandidateProfile object.
 */

export async function searchCandidates(linkedinUrl, cvFile) {
    const formData = new FormData();
    if(linkedinUrl) formData.append('linkedinUrl', linkedinUrl);
    if(cvFile) formData.append('cvFile', cvFile);
    return fetch(`${API_BASE_URL}/candidates/search`, {
        method: 'POST',
        body: formData,
    }).then(handleResponse);
}

/**
 * Fetch all candidates from the backend.
 */

export async function fetchCandidatesFromBackend() {
    const res = await fetch(`${API_BASE_URL}/candidates`);
    return handleResponse(res);
}

/**
 * Fetch a single candidate by ID from the backend.
 */

export async function fetchCandidateByIdFromBackend(id) {
    const res = await fetch(`${API_BASE_URL}/candidates/${id}`);
    return handleResponse(res);
}