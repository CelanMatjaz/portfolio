import React from 'react'
import { Task } from '../types';
import { ThemeSwitcher } from './theme_switcher';

interface TaskbarProps {
    tasks: Task[];
};

export const Taskbar: React.FC<TaskbarProps> = (props) => {
    const { tasks } = props;

    return (
        <div className="taskbar">
            <div className="tasks">
                <div className="start-button">Start</div>
                {tasks && tasks.map((task, i) => <div key={i} className="task">{task.projectId}</div>)}
            </div>
            <div className="options"><ThemeSwitcher /></div>
        </div>
    );
}
