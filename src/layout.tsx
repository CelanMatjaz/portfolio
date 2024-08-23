import React from 'react'
import { Taskbar } from './desktop/taskbar'
import { Desktop } from './desktop/desktop'
import { WindowsContext } from './context';
import { DndContext, DragEndEvent, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Index, Project as ProjectType, Window as WindowType } from './types';
import { DesktopWindow } from './desktop/desktop_window';
import { Project } from './components/project';

export const Layout: React.FC = () => {
    const { windows, setWindows } = React.useContext(WindowsContext);
    const [windowOrder, setWindowOrder] = React.useState<number[]>([]);

    const onDragStart = React.useCallback((event: DragStartEvent) => {
        /// @ts-ignore
        const windowIndex: Index = event.active.data.current.index;

        setWindowOrder(windowOrder => {
            const newWindowOrder = [...windowOrder, windowIndex.arrayIndex];
            newWindowOrder.splice(windowIndex.orderIndex, 1);
            return newWindowOrder;
        });
    }, []);

    const onDragEnd = React.useCallback((event: DragEndEvent) => {
        /// @ts-ignore
        const windowIndex: Index = event.active.data.current.index;

        setWindows(windows => {
            const newWindows = [...windows];
            newWindows[windowIndex.arrayIndex].transform.x += event.delta.x;
            newWindows[windowIndex.arrayIndex].transform.y += event.delta.y;
            return newWindows;
        });
    }, []);

    const openProjectWindow = React.useCallback((project: ProjectType) => {
        setWindows(windows => {
            const existingWindowIndex = windows.findIndex(w => w.id === project.id)

            if (existingWindowIndex === -1) {
                setWindowOrder(windowOrder => [...windowOrder, windows.length]);
                return [...windows, createNewProjectWindow(project)];
            }

            setWindowOrder(windowOrder => {
                const newWindows = [...windowOrder, existingWindowIndex];
                const windowIndexToMove = windowOrder.findIndex(i => i === existingWindowIndex);
                if (windowIndexToMove !== -1) {
                    newWindows.splice(windowIndexToMove, 1);
                }
                return newWindows;
            });

            const newWindows = [...windows];
            newWindows[existingWindowIndex].isHidden = false;
            return newWindows;
        });
    }, []);

    const onWindowClick = React.useCallback((windowIndex: Index) => {
        setWindowOrder(windowOrder => {
            const newWindowOrder = [...windowOrder, windowIndex.arrayIndex];
            newWindowOrder.splice(windowIndex.orderIndex, 1);
            return newWindowOrder;
        });

        setWindows(windows => {
            const newWindows = [...windows];
            newWindows[windowIndex.arrayIndex].isHidden = false;
            return newWindows;
        })
    }, []);

    const onWindowClose = React.useCallback((windowIndex: Index) => {
        setWindowOrder(windowOrder => {
            const newWindowOrder = [...windowOrder];
            newWindowOrder.splice(windowIndex.orderIndex, 1);
            return newWindowOrder;
        });
    }, []);

    const onWindowMinimize = React.useCallback((windowIndex: Index) => {
        setWindows(windows => {
            const newWindows = [...windows];
            newWindows[windowIndex.arrayIndex].isHidden = true;
            return newWindows;
        });
    }, []);

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
                <Desktop onOpenWindow={(p: ProjectType) => openProjectWindow(p)}>
                    {windowOrder.filter(o => windows[o].isHidden === false).map((windowIndex, i) => <DesktopWindow
                        key={i}
                        index={{ arrayIndex: windowIndex, orderIndex: i }}
                        window={windows[windowIndex]}
                        isFront={i === windowOrder.length - 1}
                        onClick={onWindowClick}
                        onClose={onWindowClose}
                        onMinimize={onWindowMinimize} />)}
                </Desktop>
            </DndContext>
            <Taskbar
                windows={windows}
                windowOrder={windowOrder}
                onTaskClick={onWindowClick}
                onTaskMinimize={onWindowMinimize}
                onOpenProjectWindow={openProjectWindow} />
        </>
    );
}

function createNewProjectWindow(project: ProjectType): WindowType {
    return {
        id: project.id,
        title: project.title,
        children: <Project project={project} />,
        transform: { x: 10, y: 10 },
        imageUrl: project.imageUrls.length > 0 ? project.imageUrls[0] : undefined,
        isHidden: false
    };
}
