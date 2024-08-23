import React from 'react'
import { Index, Project, Window } from '../types';
import { ThemeSwitcher } from '../components/theme_switcher';
import classNames from 'classnames';
import { ProjectsContext } from '../context';
import { ImageIcon } from '../assets/svg_icons';

interface TaskbarProps {
    windows: Window[];
    taskOrder: number[];
    openProjectWindow: (project: Project) => void;
    toggleWindowShown: (index: Index) => void;
};

export const Taskbar: React.FC<TaskbarProps> = ({ windows, taskOrder, toggleWindowShown, openProjectWindow }) => {
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
                <div className="grid grid-cols-2">
                    <div>
                        <div className="start-menu-group">Projects</div>
                        {projects.map((p, i) => <div key={i} className="start-menu-item" onClick={() => {
                            setStartMenuVisible(false);
                            openProjectWindow(p);
                        }}>{p.title}</div>)}
                    </div>

                </div>
                <div className="start-menu-bottom-padding"></div>
            </div>}
            <div className="tasks">
                <div className="start-button" onClick={(e) => {
                    if (startMenuVisible) {
                        window.removeEventListener("click", documentClickHandler);
                    }
                    else {
                        setTimeout(() => window.addEventListener("click", documentClickHandler), 0);
                    }
                    setStartMenuVisible(v => !v);
                    e.stopPropagation();
                }}>Start</div>
                {taskOrder.map((windowIndex, i) =>
                    <div
                        key={i}
                        className="task"
                        onClick={(e) => {
                            toggleWindowShown({ arrayIndex: windowIndex, orderIndex: -1 });
                            e.stopPropagation();
                        }}>
                        {windows[windowIndex].imageUrl
                            ? <img src={windows[windowIndex].imageUrl} />
                            : <ImageIcon />}
                    </div>
                )}
            </div>
            <div className="options"><ThemeSwitcher /></div>
        </div >
    );
}
