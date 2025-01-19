// useTranslations.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useTranslations = (component, language) => {
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_API_HOST}/api/texts?language=${language}&component=${component}`
                );
                setTranslations(response.data);
            } catch (error) {
                console.error('Error fetching translations:', error);
            }
        };

        fetchTranslations();
    }, [component, language]);

    return translations;
};

export default useTranslations;