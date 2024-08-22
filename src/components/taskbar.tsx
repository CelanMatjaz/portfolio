import React from 'react'
import {  Window } from '../types';
import { ThemeSwitcher } from './theme_switcher';

interface TaskbarProps {
    windows: Window[];
};

export const Taskbar: React.FC<TaskbarProps> = (props) => {
    const { windows } = props;

    return (
        <div className="taskbar">
            <div className="tasks">
                <div className="start-button">Start</div>
                {windows.map((window, i) => <div key={i} className="task">{window.id}</div>)}
            </div>
            <div className="options"><ThemeSwitcher /></div>
        </div>
    );
}
