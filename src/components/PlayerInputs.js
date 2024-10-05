import React from 'react';
import RandomPlayerPicker from './RandomPlayerPicker';
import { useTranslation } from 'react-i18next';

function PlayerInputs({ players, onPlayerChange, onAddPlayer, onRemovePlayer, minPlayers, maxPlayers }) {
    const { t } = useTranslation();
    const filteredPlayers = players.filter(player => player.trim() !== '');
    const addBtnDisabled = players.length >= maxPlayers;
    const removeBtnDisabled = players.length <= minPlayers;
    const addBtnClass = addBtnDisabled ? 'disabled-button' : 'enabled-button';
    const removeBtnClass = removeBtnDisabled ? 'disabled-button' : 'enabled-button';

    return (
        <section className='player-inputs-container'>
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
                <button onClick={onAddPlayer} disabled={addBtnDisabled} className={addBtnClass}>
                    {t('PlayerInputs.addPlayer')}
                </button>
                <button onClick={onRemovePlayer} disabled={removeBtnDisabled} className={removeBtnClass}>
                    {t('PlayerInputs.removePlayer')}
                </button>
            </div>
            <RandomPlayerPicker
                players={filteredPlayers}
                minPlayers={minPlayers}
            />
        </section>
    );
}

export default PlayerInputs;