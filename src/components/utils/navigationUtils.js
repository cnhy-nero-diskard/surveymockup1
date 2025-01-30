// navigationUtils.js
import axios from "axios";
import { sroutes as surveyRoutes } from "../../routes/SurveyRoutes";


/**
 * Navigates to the next step in the survey process.
 *
 * This function updates the survey progress on the backend and then navigates
 * to the next step in the survey based on the `surveyRoutes` array. If there
 * are no more steps, it navigates to a completion page or home.
 *
 * @param {number} currentStepIndex - The index of the current step in the survey.
 * @param {function} navigate - The navigation function to change the route.
 *
 * @returns {Promise<void>} A promise that resolves when the navigation is complete.
 *
 * @throws Will throw an error if the backend update or navigation fails.
 */
export const goToNextStep = async (currentStepIndex, navigate) => {
  try {
    // Update progress on the backend
    await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, {
      currentStep: currentStepIndex + 1,
      
    },{withCredentials:true});

    // Get the next step from the surveyRoutes array
    const nextStep = surveyRoutes[currentStepIndex + 1];

    if (nextStep) {
      // Navigate to the next step
      navigate(nextStep.path);
    } else {
      // If there is no next step, navigate to a completion page or home
      navigate("/survey-complete");
    }
  } catch (err) {
    console.error("Error navigating to the next step:", err);
  }
};