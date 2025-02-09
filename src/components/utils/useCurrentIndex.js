// useCurrentStepIndex.js
import { useContext } from "react";
import { useLocation } from "react-router-dom";
import SurveyRoutesContext from "../../routes/SurveyRoutesContext";
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
export const useCurrentStepIndex = (__surveyRoutes = []) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const surveyRoutes = useContext(SurveyRoutesContext);
  console.log(`useCurrentindex.js - we are in current path ${currentPath}`);

  // Find the index of the current route in the surveyRoutes array
  const currentStepIndex = surveyRoutes.findIndex((route) => {
    const routeBasePath = route.path.split('/').pop(); // Extract the last part of the route path
    const currentBasePath = currentPath.split('/').pop(); // Extract the last part of the current path
    return routeBasePath === currentBasePath; // Compare the base paths to find the matching route
  });

  return currentStepIndex;
};