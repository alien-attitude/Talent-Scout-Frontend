// src/types/candidate.ts

export interface WorkExperience {
    _id:         string;
    title:       string;
    company:     string;
    location:    string;
    startDate:   string;
    endDate:     string;
    duration:    string;
    description: string;
    current:     boolean;
}

export interface Education {
    _id:         string;
    degree:      string;
    field:       string;
    institution: string;
    year:        string;
    grade:       string;
}

export interface Recommendation {
    _id:    string;
    author: string;
    role:   string;
    text:   string;
}

export interface UploadedFile {
    originalName: string;
    storedName:   string;
    mimeType:     string;
    sizeBytes:    number;
    path:         string;
    uploadedAt:   string;
}

export interface CandidateProfile {
    _id:              string;
    employerId:       string;
    fullName:         string;
    headline:         string;
    summary:          string;
    profilePicture:   string;
    email:            string;
    phone:            string;
    location:         string;
    linkedinUrl:      string;
    portfolioLinks:   string[];
    recommendations:  Recommendation[];
    workExperience:   WorkExperience[];
    education:        Education[];
    skills:           string[];
    certifications:   string[];
    uploadedFile:     UploadedFile | null;
    processingStatus: "pending" | "processing" | "completed" | "failed";
    processingError:  string | null;
    jobId:            string | null;
    sources: {
        linkedin: boolean;
        cv:       boolean;
    };
    createdAt: string;
    updatedAt: string;
}


export interface CandidateListResponse {
    candidates: CandidateProfile[];
    pagination: {
        total:   number;
        page:    number;
        limit:   number;
        pages:   number;
        hasNext: boolean;
        hasPrev: boolean;
    };
}


export interface CandidateStats {
    total:         number;
    byStatus:      Record<string, number>;
    withLinkedin:  number;
    withCV:        number;
    averageSkills: number;
}