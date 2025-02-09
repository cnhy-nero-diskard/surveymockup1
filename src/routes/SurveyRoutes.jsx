import React, { useContext, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LanguageProvider } from '../components/partials/LanguageContext';
import SurveyStepGuard from './SurveyStepGuard';
import NotFound from '../components/admin/fallback/NotFound';
import { sroutes } from './surveyRoutesConfig';
import SurveyRoutesContext from './SurveyRoutesContext';

const SurveyRoutes = () => {
    return (
        <LanguageProvider>
            <SurveyRoutesContext.Provider value={sroutes}>
                <SurveyRoutesContent />
            </SurveyRoutesContext.Provider>
        </LanguageProvider>
    );
};

const SurveyRoutesContent = () => {
    const navigate = useNavigate();
    const sroute = useContext(SurveyRoutesContext);


    console.log("SURVEY ROUTES NAV");

    return (
        <Routes>
            {/* Dynamically generate survey routes */}
            {sroute.map((route, index) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <SurveyStepGuard
                            route={route}
                            index={index}
                            totalSteps={sroute.length}
                        />
                    }
                />
            ))}

            {/* Fallback route */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
};

export default SurveyRoutes;