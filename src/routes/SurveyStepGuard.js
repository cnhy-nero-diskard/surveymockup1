import { useEffect, useContext, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { sroutes as surveyRoutes } from "./surveyRoutesConfig";
import { UnifiedContext } from "./UnifiedContext";

const SurveyStepGuard = ({ route, index, totalSteps }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeBlocks, routes } = useContext(UnifiedContext);
  const [redirectCount, setRedirectCount] = useState(0);
  const isMounted = useRef(true); // Track if the component is mounted

  useEffect(() => {
    console.log(`SURVEY STEP GUARD - TRYING TO RENDER COMPONENT - route ${route.path} index ${index}`);

    const validateStepAccess = async () => {
      try {
        console.log("SSGUARD VERIFYING");
        const response = await axios.get(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, { withCredentials: true });
        let currentStep = response.data.currentStep;

        // Redirect to the first step if currentStep is 0 and the user is not on the first step
        if (currentStep === 0 && index !== 0) {
          navigate("/survey/");
          return;
        }

        // Handle conditional blocks
        if (route.conditionalBlock && !activeBlocks.includes(route.conditionalBlock)) {
          let newindex = index;
          while (routes[newindex].conditionalBlock !== 'universal') {
            console.log(`SSGUARD route -> ${index}`);
            newindex--;
          }

          await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/progress`, {
            currentStep: newindex,
          }, { withCredentials: true });

          navigate(`/survey/${routes[newindex].path}`);
          return;
        }

        // Strict validation: Ensure the user is on the correct step
        if (index !== currentStep) {
          console.log(`SSGUARD invalid entry index of ${index} not matching with currentStep ${currentStep}`);

          setRedirectCount(prevCount => prevCount + 1);

          // Prevent infinite loops by redirecting to 404 after 3 invalid attempts
          if (redirectCount >= 3) {
            console.error("Runaway render detected. Redirecting to 404.");
            navigate("/404");
            return;
          }

          // Redirect to the correct step immediately
          navigate(`/survey/${surveyRoutes[currentStep].path}`);
          return;
        }

        // Reset redirect count if the user is on the correct step
        setRedirectCount(0);
      } catch (err) {
        console.error("Error validating step access:", err);
        navigate("/");
      }
    };

    if (isMounted.current) {
      validateStepAccess();
    }

    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, [navigate, location.pathname, index, route.path, activeBlocks, redirectCount]);

  console.log('SSGUARD - VERIFIED');
  const StepComponent = route.component;
  return <StepComponent />;
};

export default SurveyStepGuard;
