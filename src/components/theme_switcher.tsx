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
        <span  onClick={(e) => {
            setIsDarkTheme(isDark => !isDark);
            setDarkTheme(!isDarkTheme);
            e.stopPropagation();
        }}>{isDarkTheme ? <SunIcon /> : <MoonIcon />}</span>
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
