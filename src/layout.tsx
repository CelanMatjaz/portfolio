import React from 'react'
import { Taskbar } from './components/taskbar'
import { Desktop } from './components/desktop'
import { WindowsContext } from './context';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Project, Window } from './types';
import { DesktopWindow } from './components/desktop_window';

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

    const createProjectWindow = React.useCallback(({ id, title }: Project) => {
        setWindows(windows => {
            if (!windows.find(w => w.id === id)) {
                const newWindow: Window = {
                    children: <>{title}</>,
                    transform: { x: 0, y: 0 },
                    id, title
                }
                return [...windows, newWindow];
            }

            return windows;
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
                <Desktop onOpenWindow={(p: Project) => createProjectWindow(p)}>
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
    )
}
