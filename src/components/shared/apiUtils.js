// apiUtils.js
import axios from 'axios';

export const submitSurveyResponse = async (surveyResponse) => {
    try {
        console.log(`ATTEMPTING TO SEND ${surveyResponse}`);
        const response = await axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/submit`, surveyResponse, {
            withCredentials: true,
        });
        console.log('Survey response submitted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('UTIL ----- Failed to submit survey response:', error);
        window.alert('Failed to submit survey response. Please try again later.');
        throw error; // Re-throw the error to handle it in the component
    }
};