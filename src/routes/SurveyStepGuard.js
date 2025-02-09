// SurveyStepGuard.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes as surveyRoutes } from "./surveyRoutesConfig";
/**
 * SurveyStepGuard component ensures that the user is on the correct survey step.
 * It validates the current step by making an API call and redirects if necessary.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Object} props.route - The route object containing the component to render.
 * @param {number} props.index - The index of the current step.
 * @param {number} props.totalSteps - The total number of steps in the survey.
 *
 * @returns {JSX.Element} The component for the current survey step.
 *
 * @example
 * <SurveyStepGuard route={route} index={2} totalSteps={5} />
 */
const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log(`SURVEY STEP GUARD - TRYING TO RENDER COMPONENT- route ${route.path} index ${index}`);

    const validateStepAccess = async () => {
      try {
        console.log("SSGUARD VERIFYING");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        const currentStep = response.data.currentStep;
    
        if (index !== currentStep) {
          console.log(`SSGUARD invalid entry index of ${index} not matching with currentStep ${currentStep}`);
          navigate(`/survey/${surveyRoutes[currentStep].path}`);
        }
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/");
      }
    };

    validateStepAccess();
  }, [navigate, location, index]);

  // Render the component for the current step
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;