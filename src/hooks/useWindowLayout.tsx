import React from "react";
import { Window as WindowType, Project as ProjectType, Index } from "../types";
import { Project } from "../components/project";
import { DragEndEvent, DragStartEvent } from "@dnd-kit/core/dist/types/events";

interface WindowLayout {
    windows: WindowType[];
    windowOrder: number[];
    taskOrder: number[];
};

export function useWindowLayout() {
    const [windowLayout, setWindowLayout] = React.useState<WindowLayout>({
        windows: [], windowOrder: [], taskOrder: []
    });

    const onDragStart = React.useCallback((event: DragStartEvent) => {
        /// @ts-ignore
        const index: Index = event.active.data.current.index;
        bringWindowToFront(index);
    }, []);

    const onDragEnd = React.useCallback((event: DragEndEvent) => {
        /// @ts-ignore
        const { arrayIndex }: Index = event.active.data.current.index;

        setWindowLayout(old => {
            const newLayout = { ...old, windows: [...old.windows] };
            newLayout.windows[arrayIndex] = {
                ...old.windows[arrayIndex],
                transform: {
                    ...old.windows[arrayIndex],
                    x: old.windows[arrayIndex].transform.x + event.delta.x,
                    y: old.windows[arrayIndex].transform.y + event.delta.y,
                }
            }
            return newLayout;
        });
    }, []);

    const openProjectWindow = React.useCallback((project: ProjectType) => {
        console.log("open")
        setWindowLayout(old => {
            const newLayout = { ...old };

            // Bring existing window to front
            const foundProjectWindowIndex = old.windows.findIndex(w => w.id === project.id);
            if (foundProjectWindowIndex !== -1) {
                newLayout.windowOrder = [...old.windowOrder, foundProjectWindowIndex];
                return newLayout;
            }

            newLayout.windowOrder = [...old.windowOrder, old.windows.length];
            newLayout.taskOrder = [...old.taskOrder, old.windows.length];
            newLayout.windows = [...old.windows, createNewProjectWindow(project)];

            return newLayout;
        });
    }, []);

    const closeWindow = React.useCallback(({ arrayIndex }: Index) => {
        console.log("close")
        setWindowLayout(old => {
            const newLayout = { ...old };
            newLayout.windowOrder = old.windowOrder.filter(i => i !== arrayIndex);
            newLayout.taskOrder = old.taskOrder.filter(i => i !== arrayIndex);
            return newLayout;
        });
    }, []);

    const toggleWindowShown = React.useCallback(({ arrayIndex }: Index) => {
        console.log("toggle")
        console.log(arrayIndex)
        setWindowLayout(old => {
            const newLayout = { ...old };
            const orderIndex = old.windowOrder.indexOf(arrayIndex);
            if (orderIndex === -1) {
                newLayout.windowOrder = [...old.windowOrder, arrayIndex];
            }
            else {
                newLayout.windowOrder = old.windowOrder.filter(i => i !== arrayIndex);
            }
            return newLayout;
        });
    }, []);

    const bringWindowToFront = React.useCallback(({ arrayIndex, orderIndex }: Index) => {
        console.log("front")
        setWindowLayout(old => {
            const newLayout = { ...old };
            let windowIndex = arrayIndex;

            if (orderIndex !== -1) {
                windowIndex = old.windowOrder[orderIndex];
                newLayout.windowOrder = [...old.windowOrder, windowIndex];
                newLayout.windowOrder.splice(orderIndex, 1);
            }
            else if (arrayIndex !== -1) {
                const foundOrderIndex = old.windowOrder.findIndex(i => i === arrayIndex);
                if (foundOrderIndex === -1) {
                    throw new Error(`Index ${arrayIndex} should exist in windowOrder array but doesn't`);
                }
                newLayout.windowOrder = [...old.windowOrder, old.windowOrder[foundOrderIndex]];
                newLayout.windowOrder.splice(foundOrderIndex, 1);
            }
            else {
                throw new Error("No array index provided to bring window to front");
            }

            return newLayout;
        });
    }, []);

    return {
        windowLayout,
        onDragStart,
        onDragEnd,
        openProjectWindow,
        closeWindow,
        toggleWindowShown,
        bringWindowToFront,
    };
}

function createNewProjectWindow(project: ProjectType): WindowType {
    return {
        id: project.id,
        title: project.title,
        children: <Project project={project} />,
        transform: { x: 10, y: 10 },
        imageUrl: project.imageUrls.length > 0 ? project.imageUrls[0] : undefined,
    };
}
