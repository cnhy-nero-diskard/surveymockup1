import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../components/partials/LanguageContext';
import SurveyStepGuard from './SurveyStepGuard';
import NotFound from '../components/admin/fallback/NotFound';
import { sroutes } from './surveyRoutesConfig';
import { UnifiedContext, UnifiedProvider } from './UnifiedContext';
import axios from 'axios';
import { FeedbackProvider, useFeedback } from './FeedbackContext';

/**
 * A component that sets up the routing structure for the survey application.
 * Wraps the survey routes content with necessary providers for language and unified routing.
 * 
 * @component
 * @returns {JSX.Element} A component wrapped with LanguageProvider and UnifiedProvider
 * containing the survey routes content
 */
const SurveyRoutes = () => {
    return (
        <LanguageProvider>
            <UnifiedProvider routes={sroutes}> {/* Pass sroutes as a prop */}
                <FeedbackProvider>
                    <SurveyRoutesContent />
                </FeedbackProvider>
           </UnifiedProvider>
        </LanguageProvider>
    );
};

const SurveyRoutesContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { routes, removeActiveBlocks } = useContext(UnifiedContext);
    const { setFeedback, feedback } = useFeedback(); // Access the setFeedback function from the context

    useEffect(() => {
        if (location.pathname === "/feedback") {
            const queryParams = new URLSearchParams(location.search);
            const idx = queryParams.get('idx');

            if (idx) {
                axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/establishment`,
                    { idx }, {
                    withCredentials: true
                })
                    .then(response => {
                        console.log(`TPENT API response:, ${response.data}`);

                        // Update the feedback object with the response value
                        setFeedback(prevFeedback => ({
                            ...prevFeedback,
                            entity: response.data, 
                        }));
                        console.log(`FEEDBACK STATE ${JSON.stringify(feedback)}`);
                    })
                    .catch(error => {
                        console.error('Error making API request:', error);
                    });
            } else {
                console.log('TPENT No "idx" query parameter found, skipping API request.');
            }
        }
    }, [location, setFeedback]);

    return (
        <>
            <Routes>
                {routes.map((route, index) => (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={
                            <SurveyStepGuard
                                route={route}
                                index={index}
                                totalSteps={routes.length}
                            />
                        }
                    />
                ))}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default SurveyRoutes;