import React from 'react';
import { useTranslation } from 'react-i18next';

function PlayerInputs({ players, onPlayerChange, onAddPlayer, onRemovePlayer, minPlayers, maxPlayers }) {
    const { t } = useTranslation();

    return (
        <div>
            <h2>{t('PlayerInputs.title')}:</h2>
            {players.map((player, index) => (
                <input
                    key={index}
                    type="text"
                    value={player}
                    onChange={(e) => onPlayerChange(index, e.target.value)}
                    placeholder={`${t('PlayerInputs.placeholder')} ${index + 1}`}
                />
            ))}
            <div>
                <button onClick={onAddPlayer} disabled={players.length >= maxPlayers}>
                    Add Player
                </button>
                <button onClick={onRemovePlayer} disabled={players.length <= minPlayers}>
                    Remove Player
                </button>
            </div>
        </div>
    );
}

export default PlayerInputs;