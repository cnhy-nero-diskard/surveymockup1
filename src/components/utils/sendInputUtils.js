// apiUtils.js
import axios from 'axios';

export const submitSurveyResponses = async (surveyResponses) => {
    try {
        console.log(`ATTEMPTING TO SEND ${JSON.stringify(surveyResponses)} `);
        const requests = surveyResponses.map(response =>
            axios.post(`${process.env.REACT_APP_API_HOST}/api/survey/submit`, response, {
                withCredentials: true,
            })
        );

        const results = await Promise.allSettled(requests);

        // Log results
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(`Response ${index + 1} submitted successfully:`, result.value.data);
            } else {
                console.error(`Response ${index + 1} failed to submit:`, result.reason);
            }
        });

        // Return all results (both successful and failed)
        return results;
    } catch (error) {
        console.error(`UTIL  Unexpected error while submitting the ff responses: ${surveyResponses}, ${error}`);
        window.alert('Failed to submit survey responses. Please try again later.');
        throw error; // Re-throw the error to handle it in the component
    }
};