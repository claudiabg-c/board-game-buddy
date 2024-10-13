import React, { useState, useEffect } from 'react';
import RandomPlayerPicker from './RandomPlayerPicker';
import { useTranslation } from 'react-i18next';

function PlayerInputs({ players, onPlayerChange, onAddPlayer, onRemovePlayer, minPlayers, maxPlayers }) {
    const { t } = useTranslation();
    const [frequentlyUsed, setFrequentlyUsed] = useState([]);

    const filteredPlayers = players.filter(player => player.trim() !== '');
    const addBtnDisabled = players.length >= maxPlayers;
    const removeBtnDisabled = players.length <= minPlayers;
    const addBtnClass = addBtnDisabled ? 'disabled-button' : 'enabled-button';
    const removeBtnClass = removeBtnDisabled ? 'disabled-button' : 'enabled-button';

    useEffect(() => {
        const storedPlayers = JSON.parse(localStorage.getItem('frequentlyUsedPlayers')) || {};
        const sortedPlayers = Object.keys(storedPlayers)
            .sort((a, b) => storedPlayers[b] - storedPlayers[a])
            .slice(0, 5);
        setFrequentlyUsed(sortedPlayers);
    }, []);

    const handleSelectFrequentPlayer = (name) => {
        const emptyIndex = players.findIndex(player => player.trim() === '');
        if (emptyIndex !== -1) {
            onPlayerChange(emptyIndex, name);
        }
    };

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
            {frequentlyUsed.length > 0 && (
                <div className='frequently-used'>
                    <h3>{t('PlayerInputs.frequentlyUsed')}:</h3>
                    {frequentlyUsed.map((name, index) => (
                        <button 
                            key={index} 
                            onClick={() => handleSelectFrequentPlayer(name)}
                            className='frequent-player-button'
                        >
                            {name}
                        </button>
                    ))}
                </div>
            )}
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