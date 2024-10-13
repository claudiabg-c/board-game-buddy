import React, { useState } from 'react';
import GameSearch from './components/GameSearch';
import Navbar from './components/Navbar';
import PlayerInputs from './components/PlayerInputs';
import { XMLParser } from 'fast-xml-parser';

const API_URL = 'https://corsproxy.io/?https://boardgamegeek.com/xmlapi/boardgame/';

function App() {
	const [selectedGame, setSelectedGame] = useState(null);
	const [players, setPlayers] = useState([]);
	const [minPlayers, setMinPlayers] = useState(0);
	const [maxPlayers, setMaxPlayers] = useState(0);
	const [showPlayerInputs, setShowPlayerInputs] = useState(false);

	const handleGameSelect = async (game) => {
		setSelectedGame(game);
		setShowPlayerInputs(false);

		try {
			const response = await fetch(`${API_URL}${game.id}`);
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
			const text = await response.text();
			const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });
			const result = parser.parse(text);

			const gameData = result.boardgames.boardgame;

			setMinPlayers(gameData.minplayers);
			setMaxPlayers(gameData.maxplayers);
			setPlayers(Array(gameData.minplayers).fill(''));

			setShowPlayerInputs(true);  
		} catch (error) {
			console.error("Error fetching player data:", error);
		}
	};

	const handlePlayerChange = (index, name) => {
		const newPlayers = [...players];
		newPlayers[index] = name;
		setPlayers(newPlayers);
	};

	const addPlayer = () => {
		if (players.length < maxPlayers) {
			setPlayers([...players, '']);
		}
	};

	const removePlayer = () => {
		if (players.length > minPlayers) {
			setPlayers(players.slice(0, -1));
		}
	};

	const handleSearchReset = () => {
		setShowPlayerInputs(false);
		setSelectedGame(null);
	};

	return (
		<div className="App">
			<Navbar />
			<main>
				<GameSearch onGameSelect={handleGameSelect} onSearchReset={handleSearchReset} />
				{selectedGame && showPlayerInputs && (
					<>
						<PlayerInputs
							players={players}
							onPlayerChange={handlePlayerChange}
							onAddPlayer={addPlayer}
							onRemovePlayer={removePlayer}
							minPlayers={minPlayers}
							maxPlayers={maxPlayers}
						/>
					</>
				)}
			</main>
		</div>
	);
}

export default App;