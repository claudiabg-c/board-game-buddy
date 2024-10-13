import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function RandomPlayerPicker({ players, minPlayers }) {
    const { t } = useTranslation();
    const [sortedPlayers, setSortedPlayers] = useState([]);

    const updateFrequentlyUsedPlayers = (sortedPlayers) => {
        const storedPlayers = JSON.parse(localStorage.getItem('frequentlyUsedPlayers')) || {};
        
        sortedPlayers.forEach(player => {
            const playerLower = player.toLowerCase().trim(); // Normalizar a minúsculas
            if (playerLower) {
                storedPlayers[playerLower] = (storedPlayers[playerLower] || 0) + 1; // Incrementar el recuento
            }
        });

        localStorage.setItem('frequentlyUsedPlayers', JSON.stringify(storedPlayers));
    };

    const handlePickPlayer = () => {
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        setSortedPlayers(shuffled);
        updateFrequentlyUsedPlayers(shuffled);  // Guardar en localStorage cuando se hace el sort
    };

    const isButtonDisabled = players.length < minPlayers;
    const buttonClass = isButtonDisabled ? 'disabled-button' : 'enabled-button';

    return (
        <div className='sort-players'>
            <button onClick={handlePickPlayer} disabled={isButtonDisabled} className={buttonClass}>
                {t('RandomPlayerPicker.button')}
            </button>
            <ol>
                {sortedPlayers.map((player, index) => (
                    <li key={index}>
                        {index + 1}. {player}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default RandomPlayerPicker;