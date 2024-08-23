import React from 'react'
import { Taskbar } from './desktop/taskbar'
import { Desktop } from './desktop/desktop'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Project as ProjectType } from './types';
import { DesktopWindow } from './desktop/desktop_window';
import { useWindowLayout } from './hooks/useWindowLayout';

export const Layout: React.FC = () => {
    const {
        windowLayout: { windows, windowOrder, taskOrder },
        onDragStart,
        onDragEnd,
        openProjectWindow,
        closeWindow,
        toggleWindowShown,
        bringWindowToFront
    } = useWindowLayout();

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
                    {windowOrder.map((windowIndex, i) => <DesktopWindow
                        key={i}
                        index={{ arrayIndex: windowIndex, orderIndex: i }}
                        window={windows[windowIndex]}
                        isFront={i === windowOrder.length - 1}
                        closeWindow={closeWindow}
                        toggleWindowShown={toggleWindowShown}
                        bringWindowToFront={bringWindowToFront} />
                    )}
                </Desktop>
            </DndContext>
            <Taskbar
                windows={windows}
                taskOrder={taskOrder}
                toggleWindowShown={toggleWindowShown}
                openProjectWindow={openProjectWindow} />
        </>
    );
}
