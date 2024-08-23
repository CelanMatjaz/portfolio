import React from 'react'
import { Index, Project, Window } from '../types';
import { ThemeSwitcher } from '../components/theme_switcher';
import classNames from 'classnames';
import { ProjectsContext } from '../context';
import { ImageIcon } from '../assets/svg_icons';

interface TaskbarProps {
    windows: Window[];
    windowOrder: number[];
    onOpenProjectWindow: (project: Project) => void;
    onTaskClick: (index: Index) => void;
    onTaskMinimize: (index: Index) => void;
};




export const Taskbar: React.FC<TaskbarProps> = ({ windows, windowOrder, onTaskClick, onTaskMinimize, onOpenProjectWindow }) => {
    const projects = React.useContext(ProjectsContext);

    const [startMenuVisible, setStartMenuVisible] = React.useState(false);

    const startMenuClasses = classNames(
        "start-menu",
        { "start-menu-appear": startMenuVisible }
    );

    const documentClickHandler = React.useCallback(() => {
        setStartMenuVisible(false);
        window.removeEventListener("click", documentClickHandler);
    }, []);

    return (
        <div className="taskbar">
            {startMenuVisible && <div className={startMenuClasses}>
                {projects.map((p, i) => <div key={i} className="start-menu-item" onClick={() => {
                    setStartMenuVisible(false);
                    onOpenProjectWindow(p);
                }}>{p.title}</div>)}
            </div>}
            <div className="tasks">
                <div className="start-button" onClick={() => {
                    if (startMenuVisible) {
                        window.removeEventListener("click", documentClickHandler);
                    }
                    else {
                        setTimeout(() => window.addEventListener("click", documentClickHandler), 0);
                    }

                    setStartMenuVisible(v => !v);
                }}>Start</div>
                {windows.filter((_, i) => windowOrder.includes(i)).map((window, i) => {
                    return <div key={i}
                        className="task"
                        title={window.title}
                        onClick={(e) => {
                            if (window.isHidden) {
                                onTaskClick({ orderIndex: windowOrder.findIndex(o => o === i), arrayIndex: i });
                            }
                            else {
                                onTaskMinimize({ orderIndex: windowOrder.findIndex(o => o === i), arrayIndex: i });
                            }
                            e.stopPropagation();
                        }}>
                        {window.imageUrl ?
                            <img src={window.imageUrl} /> :
                            <ImageIcon />
                        }</div>;
                })}
            </div>
            <div className="options"><ThemeSwitcher /></div>
        </div >
    );
}
