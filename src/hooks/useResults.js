import React, { useState, useEffect } from 'react';
import RAWG from '../api/RAWG';

export default () => {
    const [results, setResults] = useState(null);
    const [trending, setTrending] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [top, setTop] = useState(null);

    const getTrending = async (size) => {
        try {
            const response = await RAWG.get('/games/lists/main', {
                params: {
                    ordering: '-relevance',
                    discover: true,
                    page_size: size
                }
            });
            setTrending(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getTop = async (size) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    ordering: '-added',
                    page_size: size
                }
            });
            setTop(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }


    useEffect(() => {
        getTrending(5);
        getTop(5);
    }, []);



    return [trending, getTrending, results, setResults, top, getTop, errorMessage];
};