import React, { useState } from 'react';
import GameSearch from './components/GameSearch';
import Navbar from './components/Navbar';

function App() {
	const [selectedGame, setSelectedGame] = useState(null);
	const [players, setPlayers] = useState([]);

	const handleGameSelect = (game) => {
		setSelectedGame(game);
	};

	return (
		<div className="App">
			<Navbar />
			<GameSearch onGameSelect={handleGameSelect} />
		</div>
	);
}

export default App;
