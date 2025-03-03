import React, { useContext,useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../components/partials/LanguageContext';
import SurveyStepGuard from './SurveyStepGuard';
import NotFound from '../components/admin/fallback/NotFound';
import { sroutes } from './surveyRoutesConfig';
import { UnifiedContext, UnifiedProvider } from './UnifiedContext';
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
    const { routes } = useContext(UnifiedContext); // Access routes from the context
    useEffect(()=> {
        
    })

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

        </>);
};

export default SurveyRoutes;