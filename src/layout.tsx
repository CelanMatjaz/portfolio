import React from 'react'
import { Taskbar } from './components/taskbar'
import { Desktop } from './components/desktop'
import { WindowsContext } from './context';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Project as ProjectType } from './types';
import { DesktopWindow } from './components/desktop_window';
import { Project } from './components/project';

let handlingWindowClick = false;

export const Layout: React.FC = () => {
    const { windows, setWindows } = React.useContext(WindowsContext);

    const onDragStart = React.useCallback((event: DragStartEvent) => {
        const windowIndex = event.active.data.current!.windowIndex;
        setWindows(windows => {
            const newWindows = [...windows, windows[windowIndex]];
            newWindows.splice(windowIndex, 1);
            return newWindows;
        });
    }, [windows]);

    const onDragEnd = React.useCallback((event: DragEndEvent) => {
        setWindows(windows => {
            const newWindows = [...windows];
            newWindows[windows.length - 1].transform.x += event.delta.x;
            newWindows[windows.length - 1].transform.y += event.delta.y;
            return newWindows;
        });
    }, [windows]);

    const createProjectWindow = React.useCallback((project: ProjectType) => {
        const { id, title } = project;
        setWindows(windows => {
            const foundWindowIndex = windows.findIndex(w => w.id === id);
            if (foundWindowIndex > -1) {
                const newWindows = [...windows];
                newWindows[foundWindowIndex].transform = { x: 20, y: 20 };
                return newWindows;
            }

            return [...windows, {
                children: <Project project={project} />,
                transform: { x: 20, y: 20 },
                imageUrl: project.githubUrl.length > 0 ? project.githubUrl[0] : undefined,
                id, title
            }];
        });

    }, [windows]);

    const onWindowClick = React.useCallback((windowIndex: number) => {
        if (handlingWindowClick) {
            handlingWindowClick = false;
            return;
        }
        setWindows(windows => {
            const newWindows = [...windows, windows[windowIndex]];
            newWindows.splice(windowIndex, 1);
            return newWindows;
        });
    }, [windows]);

    const onWindowClose = React.useCallback((windowIndex: number) => {
        handlingWindowClick = true;
        setWindows(windows => {
            const newWindows = [...windows];
            newWindows.splice(windowIndex, 1);
            return newWindows;
        });
    }, [windows]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 1
            },
        })
    );

    return (
        <>
            <DndContext modifiers={[]} onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
                <Desktop onOpenWindow={(p: ProjectType) => createProjectWindow(p)}>
                    {windows.map((window, i) => <DesktopWindow
                        key={i}
                        windowIndex={i}
                        window={window}
                        isFront={i === windows.length - 1}
                        onClick={onWindowClick}
                        onClose={onWindowClose} />)}
                </Desktop>
            </DndContext>
            <Taskbar tasks={[{ projectId: 1 }]} />
        </>
    );
}

