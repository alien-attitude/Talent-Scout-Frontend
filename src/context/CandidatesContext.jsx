import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { candidateProfile } from "../types/candidate.js";
import { loadFromStorage, saveToStorage } from "./candidatesStorage.js";
import { useCandidates } from "./useCandidatesContext.js"
import { CandidatesContext } from "./useCandidatesContext.js"

export function CandidatesProvider({ children }) {
  const [state, setState] = useState(() => {
    const stored = loadFromStorage();
    const normalized = stored.map((c) => candidateProfile(c));
    return {
      candidates: normalized,
      isLoading: false,
    };
  });

  const { candidates, isLoading } = state;

  const addCandidate = useCallback((candidate) => {
    const normalized = candidateProfile(candidate);

    setState((prev) => {
      const exists = prev.candidates.some((c) => c.id === normalized.id);
      const updated = exists
        ? prev.candidates.map((c) =>
            c.id === normalized.id ? normalized : c
          )
        : [normalized, ...prev.candidates];

      saveToStorage(updated);
      return {
        ...prev,
        candidates: updated,
      };
    });
  }, []);

  const getCandidateById = useCallback(
    (id) => candidates.find((c) => c.id === id),
    [candidates]
  );

  return (
    <CandidatesContext.Provider
      value={{
        candidates,
        isLoading,
        addCandidate,
        getCandidateById,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  );
}

CandidatesProvider.propTypes = {
  children: PropTypes.node,
};

export { useCandidates };