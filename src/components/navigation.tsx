import React from "react";
import { NavLink } from "react-router-dom";
import { MoonIcon, SunIcon } from "../assets/svg_icons";


export const Navigation = () => {
    React.useEffect(() => {
        if (localStorage.getItem('theme') === 'dark') {
            setDarkTheme(true);
        }
    }, []);

    const [isDarkTheme, setIsDarkTheme] = React.useState(localStorage.getItem('theme') === 'dark');

    return <nav className="navigation">
        <ul>
            <li><NavLink to="about" className="nav-link">About</NavLink></li>
            <li><NavLink to="projects" className="nav-link" >Projects</NavLink></li>
        </ul>
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
