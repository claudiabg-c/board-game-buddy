import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function RandomPlayerPicker({ players, minPlayers }) {
    const { t } = useTranslation();
    const [sortedPlayers, setSortedPlayers] = useState([]);

    const handlePickPlayer = () => {
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        setSortedPlayers(shuffled);
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