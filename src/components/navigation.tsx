import { NavLink } from "react-router-dom";
import { ThemeSwitcher } from "./theme_switcher";

export const Navigation = () => {
    return <nav className="navigation">
        <ul>
            <li><NavLink to="" className="nav-link">About</NavLink></li>
            <li><NavLink to="projects" className="nav-link" >Projects</NavLink></li>
            {/*<li><NavLink to="demos" className="nav-link" >Demos</NavLink></li>*/}
        </ul>
        <div>
            <ThemeSwitcher />
        </div>
    </nav>
}
