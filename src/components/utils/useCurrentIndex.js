// useCurrentStepIndex.js
import { useLocation } from "react-router-dom";
import { sroutes as surveyRoutes } from "../../routes/SurveyRoutes";
/**
 * Custom hook to get the index of the current step in the survey based on the current URL path.
 *
 * @returns {number} The index of the current step in the surveyRoutes array.
 *
 * @example
 * // Assuming surveyRoutes is an array of route objects with a 'path' property
 * const currentStepIndex = useCurrentStepIndex();
 * console.log(currentStepIndex); // Outputs the index of the current route
 *
 * @requires useLocation from 'react-router-dom'
 * @requires surveyRoutes - An array of route objects with a 'path' property
 */
export const useCurrentStepIndex = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(`useCurrentindex.js - we are in current path ${currentPath}`);

  // Find the index of the current route in the surveyRoutes array
  const currentStepIndex = surveyRoutes.findIndex(
    (route) => route.path === currentPath
  );

  return currentStepIndex;
};