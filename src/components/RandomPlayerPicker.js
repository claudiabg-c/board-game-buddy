import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function RandomPlayerPicker({ players }) {
    const { t } = useTranslation();
    const [sortedPlayers, setSortedPlayers] = useState([]);

    const handlePickPlayer = () => {
        const shuffled = [...players].sort(() => 0.5 - Math.random());
        setSortedPlayers(shuffled);
    };

    return (
        <div>
            <button onClick={handlePickPlayer} disabled={players.length === 0}>
                {t('RandomPlayerPicker.button')}
            </button>
            {sortedPlayers.length > 0 ? (
                <ol>
                    {sortedPlayers.map((player, index) => (
                        <li key={index}>
                            {player}
                        </li>
                    ))}
                </ol>
            ) : (
                <p>{t('RandomPlayerPicker.noPlayers')}</p>
            )}
        </div>
    );
}

export default RandomPlayerPicker;
