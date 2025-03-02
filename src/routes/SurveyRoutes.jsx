import React, { useContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
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
    const { routes } = useContext(UnifiedContext); // Access routes from the context

    console.log("SURVEY ROUTES NAV");

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
    
</>    );
};

export default SurveyRoutes;