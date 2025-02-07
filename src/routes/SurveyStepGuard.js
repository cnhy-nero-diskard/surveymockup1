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
        console.log("SURVEY STEP GUARD VERIFYING");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        const currentStep = response.data.currentStep;
        console.log("Backend Current Step:", currentStep);
        console.log("Component Index:", index);
    
        if (index !== currentStep) {
          console.log("Redirecting to:", surveyRoutes[currentStep].path);
          navigate(`/survey/${surveyRoutes[currentStep].path}`);
        }
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/gyatt");
      }
    };

    validateStepAccess();
  }, [navigate, location, index]);

  // Render the component for the current step
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;