// SurveyStepGuard.js
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes } from "./SurveyRoutes";

const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const validateStepAccess = async () => {
      try {
        // Fetch the user's current progress from the backend
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`);
        const currentStep = response.data.currentStep;

        // Check if the user is allowed to access this step
        if (index !== currentStep) {
          // Redirect to the correct step
          navigate(sroutes[currentStep].path);
        }
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/"); // Redirect to the default route on error
      }
    };

    validateStepAccess();
  }, [navigate, location, index]);

  // Render the component for the current step
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;