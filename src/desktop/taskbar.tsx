import React from 'react'
import { Window } from '../types';
import { ThemeSwitcher } from '../components/theme_switcher';
import classNames from 'classnames';

interface TaskbarProps {
    windows: Window[];
};

export const Taskbar: React.FC<TaskbarProps> = (props) => {
    const { windows } = props;

    const [startMenuVisible, setStartMenuVisible] = React.useState(false);

    const startMenuClasses = classNames(
        "start-menu",
        { "start-menu-appear": startMenuVisible }
    );

    return (
        <div className="taskbar">
            {startMenuVisible && <div className={startMenuClasses}>
                <div>ASd</div>
                <div>ASd</div>
                <div>ASd</div>
                <div>ASd</div>
                <div>ASd</div>
                <div>ASd</div>
            </div>}
            <div className="tasks">
                <div className="start-button" onClick={() => setStartMenuVisible(v => !v)}>Start</div>
                {windows.map((window, i) => <div key={i} className="task">{window.id}</div>)}
            </div>
            <div className="options"><ThemeSwitcher /></div>
        </div>
    );
}
