import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';

function Navbar() {
    return (
        <nav>
            <h1>Board Game Buddy</h1>
            <LanguageSwitcher />
        </nav>
    );
}

export default Navbar;