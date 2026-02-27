import PropTypes from "prop-types";
import { candidatePropType } from "./candidate.js";

export const candidatesContextValuePropType = PropTypes.shape({
  candidates: PropTypes.arrayOf(candidatePropType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  addCandidate: PropTypes.func.isRequired,
  getCandidateById: PropTypes.func.isRequired,
});