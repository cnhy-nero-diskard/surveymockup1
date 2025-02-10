// SurveyStepGuard.js
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes as surveyRoutes } from "./surveyRoutesConfig";
import { UnifiedContext } from "./UnifiedContext";

const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeBlocks } = useContext(UnifiedContext);

  useEffect(() => {
    console.log(`SURVEY STEP GUARD - TRYING TO RENDER COMPONENT- route ${route.path} index ${index}`);

    /**
     * Validates access to the current survey step.
     * 
     * This function checks if the user is allowed to access the current survey step
     * by making an API call to get the user's current progress. If the user is not
     * allowed to access the step, they are redirected to the appropriate step.
     * 
     * @async
     * @function validateStepAccess
     * @throws Will navigate to the home page if there is an error validating step access.
     */
    const validateStepAccess = async () => {
      try {
        console.log("SSGUARD VERIFYING");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        let currentStep = response.data.currentStep;

        // Check if the current step belongs to a conditional block
        // If the step is part of a conditional block and the block is not active,
        // update the current step to skip this step and go to the next one.
        if (route.conditionalBlock && !activeBlocks.includes(route.conditionalBlock)) {
          currentStep = index + 1;
        }

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
  }, [navigate, location, index, route, activeBlocks]);

  // Render the component for the current step
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;