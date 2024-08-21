import React from 'react'
import { Taskbar } from './components/taskbar'
import { Desktop } from './components/desktop'
import { WindowsContext } from './context';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Project } from './types';
import { DesktopWindow } from './components/desktop_window';

export const Layout: React.FC = () => {
    const { windows, setWindows } = React.useContext(WindowsContext);
    const [selectedWindowIndex, setSelectedWindowIndex] = React.useState(0);

    const onDragStart = React.useCallback((event: DragStartEvent) => {
        const windowIndex = event.active.data.current!.windowIndex;
        setWindows(windows => {
            const newWindows = [...windows, windows[windowIndex]];
            newWindows.splice(windowIndex, 1);
            return newWindows;
        });
    }, [selectedWindowIndex, windows]);

    const onDragEnd = React.useCallback((event: DragEndEvent) => {
        setWindows(windows => {
            const newWindows = [...windows];
            newWindows[selectedWindowIndex].transform.x += event.delta.x;
            newWindows[selectedWindowIndex].transform.y += event.delta.y;
            return newWindows;
        });
    }, [selectedWindowIndex, windows]);

    const createProjectWindow = React.useCallback(({ id, title }: Project) => {
        setWindows(windows => {
            if (!windows.find(w => w.id === id)) {
                setSelectedWindowIndex(windows.length);
                const newWindow = {
                    children: <>{title}</>,
                    transform: { x: 0, y: 0 },
                    id, title
                }
                return [...windows, newWindow];
            } else {
                setSelectedWindowIndex(windows.indexOf(windows.find(w => w.id === id)!))
            }

            return windows;
        });

    }, [selectedWindowIndex, windows]);

    const onWindowClick = React.useCallback((windowIndex: number) => {
        setWindows(windows => {
            const newWindows = [...windows, windows[windowIndex]];
            newWindows.splice(windowIndex, 1);
            return newWindows;
        });
    }, [selectedWindowIndex, windows]);

    const onWindowClose = React.useCallback((windowId: number) => {
        let newWindowIndex = selectedWindowIndex - 1;

        setWindows(windows => {
            return windows.filter(w => w.id !== windowId);
        });

        setSelectedWindowIndex(newWindowIndex);
    }, [selectedWindowIndex, windows]);

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
                        isFront={i == selectedWindowIndex}
                        onClick={onWindowClick}
                        onClose={onWindowClose} />)}
                </Desktop>
            </DndContext>
            <Taskbar tasks={[{ projectId: 1 }]} />
        </>
    )
}
