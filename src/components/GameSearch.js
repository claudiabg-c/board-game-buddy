import React, { useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

const API_URL = 'https://corsproxy.io/?https://boardgamegeek.com/xmlapi/search';

function GameSearch({ onGameSelect }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [games, setGames] = useState([]);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        try {
            const response = await fetch(`${API_URL}?search=${searchTerm}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const text = await response.text();
            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: "@_"
            });
            const result = parser.parse(text);

            const boardgames = result.boardgames.boardgame.map(game => ({
                id: game['@_objectid'],
                name: game.name ? game.name['#text'] : 'Unknown',
                yearpublished: game.yearpublished
            }));

            setGames(boardgames);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a game..."
            />
            <button onClick={handleSearch}>Search</button>

            {error && <p>Error: {error}</p>}

            <ul>
                {games.map((game) => (
                    <li key={game.id}>
                        {game.name} (Year Published: {game.yearpublished})
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GameSearch;
