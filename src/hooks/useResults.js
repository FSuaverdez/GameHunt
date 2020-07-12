import React, { useState, useEffect } from 'react';
import RAWG from '../api/RAWG';

export default () => {
    const [gameInfo, setGameInfo] = useState(null);
    const [screenshots, setScreens] = useState(null);
    const [trending, setTrending] = useState(null);
    const [top, setTop] = useState(null);
    const [dev, setDev] = useState(null);
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
    const getDev = async (size) => {
        try {
            const response = await RAWG.get('/developers', {
                params: {
                    ordering: '-added',
                    page_size: size
                }
            });
            setDev(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }
    const getGames = async (size, term) => {
        try {
            const response = await RAWG.get('/games', {
                params: {
                    search: term,
                    page_size: size
                }
            });
            setResults(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    }


    const getResult = async (id) => {
        try {
        const response = await RAWG.get(`/games/${id}`);
        setGameInfo(response.data);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    };

    const getScreens = async (id) => {
        try {
        const response = await RAWG.get(`/games/${id}/screenshots`);
        setScreens(response.data.results);
        } catch (err) {
            setErrorMessage("Something Went Wrong.");
        }
    };



    return [
        getTrending,
        trending,
        errorMessage,
        gameInfo,
        screenshots,
        getResult,
        getScreens,
        getTop,
        top,
        dev,
        getDev,
        getGames,
        results
    ];
};