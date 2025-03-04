import React, { useContext, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../components/partials/LanguageContext';
import SurveyStepGuard from './SurveyStepGuard';
import NotFound from '../components/admin/fallback/NotFound';
import { sroutes } from './surveyRoutesConfig';
import { UnifiedContext, UnifiedProvider } from './UnifiedContext';
import axios from 'axios';

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
                <SurveyRoutesContent />
            </UnifiedProvider>
        </LanguageProvider>
    );
};

const SurveyRoutesContent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { routes, removeActiveBlocks } = useContext(UnifiedContext); // Access routes from the context

    useEffect(() => {
        // Check if the current path is "/feedback"
        if (location.pathname === "/feedback") {

            console.log('TPENT REMOVING `FEEDBACK`');
            console.log('TPENT Location:', location.pathname);
            // Get the query parameters from the URL
            const queryParams = new URLSearchParams(location.search);
            const idx = queryParams.get('idx'); // Get the value of the "idx" query parameter

            // If "idx" is present, make an API request
            if (idx) {
                console.log(`TPENT Found "idx" with value ${idx}`);
                // Make the API request with the idx value
                axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/establishment`,
                    { idx }, {
                    withCredentials: true
                })
                    .then(response => {
                        console.log('TPENT API response:', response.data);
                        // Handle the API response as needed
                    })
                    .catch(error => {
                        console.error('Error making API request:', error);
                    });
            } else {
                // If there's no "idx", avoid making the API request
                console.log('TPENT No "idx" query parameter found, skipping API request.');
            }
        }
    }, [location]); // Run this effect whenever the location changes

    return (
        <>
            <Routes>
                {/* Dynamically generate survey routes */}
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

                {/* Fallback route */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default SurveyRoutes;