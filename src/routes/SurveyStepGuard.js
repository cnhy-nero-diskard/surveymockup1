// SurveyStepGuard.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes as surveyRoutes } from "./SurveyRoutes";

const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateStepAccess = async () => {
      try {
        console.log("SURVEY STEP GUARD VERIFYING")
        // Fetch the user's current progress from the backend
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`,{withCredentials:true});
        const currentStep = response.data.currentStep;
        console.log(currentStep);
        // Check if the user is allowed to access this step
        if (index !== currentStep) {
          // Redirect to the correct step
          navigate(surveyRoutes[currentStep].path);
        }
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/gyatt"); // Redirect to the default route on error
      }
    };

    validateStepAccess();
  }, [navigate, location, index]);

  // Render the component for the current step
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;