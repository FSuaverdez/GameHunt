import React, { useState, useEffect } from 'react';
import RAWG from '../api/RAWG';

export default () => {
    const [results, setResults] = useState(null);
    const [trending, setTrending] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [top, setTop] = useState(null);
    const [gameInfo, setGameInfo] = useState(null);
    const [screenshots, setScreens] = useState(null);
    const [topYear,setTopYear] = useState(null);

    const getTopYear = async (size,year, isMounted) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    dates: `${year}-01-01,${year}-12-31`,
                    ordering: '-relevance',
                    page_size: size
                }
            });
            if (isMounted) {
                setTopYear(response.data.results);
            }
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getTrending = async (size, isMounted) => {
        try {
            const response = await RAWG.get('/games/lists/main', {
                params: {
                    ordering: '-relevance',
                    discover: true,
                    page_size: size
                }
            });
            if (isMounted) {
                setTrending(response.data.results);
            }
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getTop = async (size, isMounted) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    ordering: '-added',
                    page_size: size
                }
            });
            if (isMounted) {
                setTop(response.data.results);
            }
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getGames = async (size, term, isMounted) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    search: term,
                    page_size: size
                }
            });
            if (isMounted) {
                setResults(response.data.results);
            }

        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }

    const getResult = async (id, isMounted) => {
        const response = await RAWG.get(`/games/${id}`);
        if (isMounted) {
            setGameInfo(response.data);
        }
    };
    const getScreens = async (id, isMounted) => {
        const response = await RAWG.get(`/games/${id}/screenshots`);
        if (isMounted) {
            setScreens(response.data.results);
        }
    };






    return [trending, getTrending, results, setResults, top, getTop, getGames, gameInfo, getResult, screenshots, getScreens, errorMessage, getTopYear,topYear];
};