import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"
import { Index, Window } from "../../types";
import { CrossIcon, MinimizeIcon } from "../../assets/svg_icons";
import classNames from "classnames";

interface DesktopWindowProps {
    index: Index;
    window: Window;
    isFront: boolean
    closeWindow: (index: Index) => void;
    toggleWindowShown: (index: Index) => void;
    bringWindowToFront: (index: Index) => void;
};

export const DesktopWindow: React.FC<DesktopWindowProps> = (props) => {
    const { index, window: w, toggleWindowShown, closeWindow, bringWindowToFront, isFront } = props;

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.window.id,
        data: { index }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        top: props.window.transform.y,
        left: props.window.transform.x,
    };

    return (
        <span

            className={classNames("desktop-window", { front: isFront, 'z-20': isFront })}
            onClick={() => bringWindowToFront(index)}
            onScroll={e => e.stopPropagation()}
            style={style}
            ref={setNodeRef}
            {...listeners}
            {...attributes}>
            <div className="window-titlebar select-none">
                <div className="window-title">Project - {w.title}</div>
                <span className="buttons">
                    <div className="hover:bg-gray-600 hover:fill-white" onClick={(e) => {
                        toggleWindowShown(index);
                        e.stopPropagation();
                    }}><MinimizeIcon /></div>
                    <div className="hover:bg-red-500 hover:fill-white" onClick={(e) => {
                        closeWindow(index);
                        e.stopPropagation();
                    }}><CrossIcon /></div>
                </span>
            </div>
            <div className="window-content">
                {w.children}
            </div>
        </span>
    );
}
