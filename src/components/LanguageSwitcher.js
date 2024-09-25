import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        setSelectedLanguage(lng);
    };

    return (
        <div>
            <button onClick={() => changeLanguage('es')} className={selectedLanguage === 'es' ? 'selected' : ''}>
                Español
            </button>
            <button onClick={() => changeLanguage('en')} className={selectedLanguage === 'en' ? 'selected' : ''}>
                English
            </button>
        </div>
    );
}

export default LanguageSwitcher;