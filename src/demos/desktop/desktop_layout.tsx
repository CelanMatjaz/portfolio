import React from 'react'
import { DndContext, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { Project as ProjectType } from '../../types'
import { Desktop } from './desktop';
import { DesktopWindow } from './desktop_window';
import { Taskbar } from './taskbar';
import { createNewProjectWindow, useWindowLayout } from '../../hooks/useWindowLayout';

export const DesktopLayout: React.FC = () => {
    const {
        windowLayout: { windows, windowOrder, taskOrder },
        onDragStart,
        onDragEnd,
        openWindow,
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
        <div className="desktop-layout">
            <DndContext modifiers={[]} onDragStart={onDragStart} onDragEnd={onDragEnd} sensors={sensors}>
                <Desktop onOpenWindow={(p: ProjectType) => openWindow(createNewProjectWindow(p))}>
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
                openWindow={openWindow} />
        </div>
    );
}
