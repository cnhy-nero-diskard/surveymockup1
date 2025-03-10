// apiUtils.js
import axios from 'axios';

export const submitSurveyResponses = async (
    surveyResponses,
    touchpoint = "TPMS"  // Default value for touchpoint
) => {
    try {
        console.log(`SUBMIT array : ${JSON.stringify(surveyResponses)}`);
        
        // Ensure surveyResponses is an array
        if (!Array.isArray(surveyResponses)) {
            console.log('SUBMIT Survey responses was not an array - converting to array');
            surveyResponses = [surveyResponses];
        }
        
        // Add the touchpoint property to each response object
        surveyResponses = surveyResponses.map((response) => ({
            ...response,
            touchpoint,
        }));

        // Send all responses in a single request
        const response = await axios.post(
            `${process.env.REACT_APP_API_HOST}/api/survey/submit`,
            { surveyResponses },
            {
                withCredentials: true,
            }
        );

        console.log('SUBMIT Survey responses submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('SUBMIT Unexpected error while submitting survey responses:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};
