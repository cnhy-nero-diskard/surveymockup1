import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes as surveyRoutes } from "./surveyRoutesConfig";
import { UnifiedContext } from "./UnifiedContext";
import { goToNextStep } from "../components/utils/navigationUtils";

const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeBlocks, routes } = useContext(UnifiedContext);
  const [redirectCount, setRedirectCount] = useState(0); // Track the number of redirections
  const [isLoopRunning, setIsLoopRunning] = useState(false); // Track if the while loop is running

  useEffect(() => {
    console.log(`SURVEY STEP GUARD - TRYING TO RENDER COMPONENT- route ${route.path} index ${index}`);

    const validateStepAccess = async () => {
      try {
        console.log("SSGUARD VERIFYING");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        let currentStep = response.data.currentStep;

        if (currentStep === 0 && index !== 0) { navigate("/survey/") }

        let newindex = index;
        if (route.conditionalBlock && !activeBlocks.includes(route.conditionalBlock)) {
          setIsLoopRunning(true); // Set the loop running state to true
          while (routes[newindex].conditionalBlock !== 'universal') { 
            console.log(`SSGUARD route -> ${index}`)
            newindex--; 
          }
          setIsLoopRunning(false); // Set the loop running state to false after the loop completes

          await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, {
            currentStep: newindex,
          }, { withCredentials: true });
      
          navigate(`/survey/${route.path}`);
        }
        if (index !== currentStep) {
          console.log(`SSGUARD invalid entry index of ${index} not matching with currentStep ${currentStep}`);

          setRedirectCount(prevCount => prevCount + 1);

          // if (redirectCount >= 3) {
          //   console.error("Runaway render detected. Redirecting to 404.");
          //   navigate("/404");
          //   return;
          // }

          navigate(`/survey/${surveyRoutes[currentStep].path}`);
        } else {
          setRedirectCount(0);
        }
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/");
      }
    };

    if (!isLoopRunning) {
      validateStepAccess();
    }
  }, [navigate, location, index, route, activeBlocks, redirectCount, isLoopRunning]);

  // Render the component for the current step
  console.log('SSGUARD - VERIFIED');
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;