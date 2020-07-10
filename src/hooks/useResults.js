import React, { useState, useEffect } from 'react';
import RAWG from '../api/RAWG';

export default () => {
    const [results, setResults] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const getTrending = async (size) => {
        try {
            const response = await RAWG.get('/games/lists/main', {
                params: {
                    ordering: '-relevance',
                    discover: true,
                    page_size: size
                }
            });
            setResults(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }


    



    return [getTrending, results, errorMessage];
};