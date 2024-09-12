import React from 'react';
import RandomPlayerPicker from './RandomPlayerPicker';
import { useTranslation } from 'react-i18next';

function PlayerInputs({ players, onPlayerChange, onAddPlayer, onRemovePlayer, minPlayers, maxPlayers }) {
    const { t } = useTranslation();

    return (
        <section>
            <h2>{t('PlayerInputs.title')}:</h2>
            <div className='player-inputs'>
                {players.map((player, index) => (
                    <input
                        key={index}
                        type='text'
                        value={player}
                        onChange={(e) => onPlayerChange(index, e.target.value)}
                        placeholder={`${t('PlayerInputs.placeholder')} ${index + 1}`}
                    />
                ))}
            </div>
            <div className='player-buttons'>
                <button onClick={onAddPlayer} disabled={players.length >= maxPlayers}>
                    Add Player
                </button>
                <button onClick={onRemovePlayer} disabled={players.length <= minPlayers}>
                    Remove Player
                </button>
            </div>
            <RandomPlayerPicker players={players} />
        </section>
    );
}

export default PlayerInputs;