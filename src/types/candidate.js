import PropTypes from "prop-types";

export const sourceTypes = {
  LINKEDIN: "linkedin",
  CV: "cv",
  BOTH: "both",
};

export const workExperience = ({
  id,
  company,
  role,
  duration,
  description,
  source,
}) => {
  return {
    id,
    company,
    role,
    duration,
    description,
    source,
  };
};

export const education = ({ id, institution, degree, field, year, source }) => {
  return {
    id,
    institution,
    degree,
    field,
    year,
    source,
  };
};

export const portfolioLink = ({ label, url }) => {
  return {
    label,
    url,
  };
};

export const candidateProfile = (raw = {}) => {
  return {
    id: raw.id ?? String(raw.id ?? Date.now()),
    fullName: raw.fullName ?? raw.name ?? "",
    headline: raw.headline ?? "",
    location: raw.location ?? "",
    email: raw.email ?? "",
    phone: raw.phone ?? "",
    bio: raw.bio ?? "",
    profilePicture: raw.profilePicture ?? "",
    skills: Array.isArray(raw.skills)
        ? raw.skills
        : typeof raw.skills === "string"
        ? raw.skills.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
    certifications: raw.certifications ?? [],
    workExperience: raw.workExperience ?? [],
    education: raw.education ?? [],
    portfolioLinks: raw.portfolioLinks ?? [],
    recommendations: raw.recommendations ?? [],
    linkedinUrl: raw.linkedinUrl ?? "",
    cvFileName: raw.cvFileName ?? "",
    primarySource: raw.primarySource ?? sourceTypes.LINKEDIN,
    submittedAt: raw.submittedAt ?? new Date().toISOString(),
    status: raw.status ?? "new",
  };
};

// Reusable PropType that mirrors candidateProfile
export const candidatePropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  fullName: PropTypes.string,
  headline: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  bio: PropTypes.string,
  profilePicture: PropTypes.string,
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  certifications: PropTypes.arrayOf(PropTypes.string),
  workExperience: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      company: PropTypes.string,
      role: PropTypes.string,
      duration: PropTypes.string,
      description: PropTypes.string,
      source: PropTypes.oneOf([
        sourceTypes.LINKEDIN,
        sourceTypes.CV,
        sourceTypes.BOTH,
      ]),
    })
  ),
  education: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      institution: PropTypes.string,
      degree: PropTypes.string,
      field: PropTypes.string,
      year: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      source: PropTypes.oneOf([
        sourceTypes.LINKEDIN,
        sourceTypes.CV,
        sourceTypes.BOTH,
      ]),
    })
  ),
  portfolioLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  recommendations: PropTypes.arrayOf(PropTypes.any),
  linkedinUrl: PropTypes.string,
  cvFileName: PropTypes.string,
  primarySource: PropTypes.oneOf([
    sourceTypes.LINKEDIN,
    sourceTypes.CV,
    sourceTypes.BOTH,
  ]),
  submittedAt: PropTypes.string,
  status: PropTypes.oneOf(["new", "reviewed", "interviewing", "hired", "rejected"]).isRequired,
});