import React, { useState } from 'react';
import GameSearch from './components/GameSearch';

function App() {
  const [setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="App">
      <h1>Board Game Buddy</h1>
      <GameSearch onGameSelect={handleGameSelect} />
    </div>
  );
}

export default App;
