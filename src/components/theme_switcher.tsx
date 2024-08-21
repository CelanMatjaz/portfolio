import React from "react";
import { MoonIcon, SunIcon } from "../assets/svg_icons";

export const ThemeSwitcher = () => {
    React.useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkTheme(true);
        }
    }, []);

    const [isDarkTheme, setIsDarkTheme] = React.useState(localStorage.getItem('theme') === 'dark');

    return <nav className="theme-switcher">
        <button className={isDarkTheme ? '' : 'hidden'} onClick={() => {
            setIsDarkTheme(false);
            setDarkTheme(false);
        }}><SunIcon /></button>
        <button className={isDarkTheme ? 'hidden' : ''} onClick={() => {
            setIsDarkTheme(true);
            setDarkTheme(true);
        }}><MoonIcon /></button>
    </nav>
}

function setDarkTheme(isDark: boolean) {
    if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
    else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
}
