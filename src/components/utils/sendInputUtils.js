
// apiUtils.js
import axios from 'axios';

export const submitSurveyResponses = async (surveyResponses) => {
    try {
        // Ensure surveyResponses is an array
        if (!Array.isArray(surveyResponses)) {
            console.log('Survey responses was not an array - converting to array');
            surveyResponses = [surveyResponses];
        }

        // Send all responses in a single request
        const response = await axios.post(
            `${process.env.REACT_APP_API_HOST}/api/survey/submit`,
            { surveyResponses },
            {
                withCredentials: true,
            }
        );

        console.log('Survey responses submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Unexpected error while submitting survey responses:', error);
        throw error; // Re-throw the error to handle it in the component
    }
};
