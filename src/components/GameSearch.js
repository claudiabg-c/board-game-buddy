import React, { useState, useEffect, useCallback } from 'react';
import { XMLParser } from 'fast-xml-parser';
import { useTranslation } from 'react-i18next';

const SEARCH_API_URL = 'https://corsproxy.io/?https://boardgamegeek.com/xmlapi/search';
const GAME_API_URL = 'https://corsproxy.io/?https://boardgamegeek.com/xmlapi/boardgame/';
const PAGE_SIZE = 8;

function GameSearch({ onGameSelect, onSearchReset }) {
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [allIds, setAllIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [noResultsMessage, setNoResultsMessage] = useState('');
    const [gameSelected, setGameSelected] = useState(false);

    const fetchGameDetails = useCallback(async (ids) => {
        try {
            const response = await fetch(`${GAME_API_URL}${ids}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
            const result = parser.parse(text);
            if (result.boardgames && result.boardgames.boardgame) {
                return result.boardgames.boardgame;
            }
            return [];
        } catch (err) {
            console.error('Error fetching game details:', err);
            return [];
        }
    }, []);

    const fetchGamesForPage = useCallback(async (page) => {
        setLoading(true);
        const startIndex = (page - 1) * PAGE_SIZE;
        const endIndex = startIndex + PAGE_SIZE;
        const idsToFetch = allIds.slice(startIndex, endIndex);

        if (idsToFetch.length === 0) {
            setLoading(false);
            return;
        }

        const idsString = idsToFetch.join(',');
        const gamesData = await fetchGameDetails(idsString);

        if (gamesData.length > 0) {
            const gamesOnPage = gamesData.map(game => {
                const nameArray = Array.isArray(game.name) ? game.name : [game.name];
                const primaryName = nameArray.find(n => n['@_primary'] === 'true');
                const displayName = primaryName ? primaryName['#text'] : (nameArray[0] ? nameArray[0]['#text'] : 'Unknown');

                return {
                    id: game['@_objectid'],
                    name: displayName,
                    yearpublished: game.yearpublished,
                    thumbnail: game.thumbnail || null
                };
            });

            setGames(gamesOnPage);
            setNoResultsMessage('');
        } else {
            setGames([]);
            setNoResultsMessage(`${t('GameSearch.noResults')} '${searchTerm}'.`);
        }
        setLoading(false);
    }, [allIds, fetchGameDetails, t]);

    const handleSearch = async () => {
        if (!searchTerm) return;

        onSearchReset();
        setCurrentPage(1);
        setGames([]);
        setNoResultsMessage('');
        setSearchPerformed(true);
        setGameSelected(false);

        try {
            const response = await fetch(`${SEARCH_API_URL}?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });
            const result = parser.parse(text);

            if (result.boardgames && result.boardgames.boardgame) {
                const boardgames = result.boardgames.boardgame.map(game => game['@_objectid']);
                setAllIds(boardgames);
                fetchGamesForPage(1);
            } else {
                setAllIds([]);
                setNoResultsMessage(`${t('GameSearch.noResults')} '${searchTerm}'.`);
            }
        } catch (err) {
            console.log(`${err.message}`);
        }
    };

    useEffect(() => {
        if (allIds.length > 0) {
            fetchGamesForPage(currentPage);
        }
    }, [currentPage, allIds, fetchGamesForPage]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleGameClick = (game) => {        
        setGames([game]);
        onGameSelect(game);
        setGameSelected(true);
    };

    return (
        <section className='search-container'>
            <input
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder={t('GameSearch.placeholder')}
            />
            <button onClick={handleSearch}>
                {t('GameSearch.button')}
            </button>

            {loading && <p>{t('GameSearch.loading')}</p>}
            {noResultsMessage && <p>{noResultsMessage}</p>}

            <ul className='search-result'>
                {games.map((game) => (
                    <li key={game.id} onClick={() => handleGameClick(game)}>
                        <p>{game.name} ({game.yearpublished})</p>
                        {game.thumbnail && <img src={game.thumbnail} alt={game.name} />}
                    </li>
                ))}
            </ul>

            {searchPerformed && !gameSelected && allIds.length > PAGE_SIZE && (
                <>
                    <button
                        disabled={currentPage === 1 || loading}
                        onClick={() => setCurrentPage(prevPage => prevPage - 1)}
                    >
                        {t('GameSearch.prev')}
                    </button>
                    <button
                        disabled={(currentPage * PAGE_SIZE) >= allIds.length || loading}
                        onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    >
                        {t('GameSearch.next')}
                    </button>
                </>
            )}
        </section>
    );
}

export default GameSearch;