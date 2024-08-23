import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"
import { Index, Window } from "../types";
import { CrossIcon, MinimizeIcon } from "../assets/svg_icons";
import classNames from "classnames";

interface DesktopWindowProps {
    index: Index;
    window: Window;
    isFront: boolean
    onClick: (index: Index) => void;
    onClose: (index: Index) => void;
    onMinimize: (index: Index) => void;
}

export const DesktopWindow: React.FC<DesktopWindowProps> = (props) => {
    const { index, window: w, onClose, onClick, onMinimize, isFront } = props;

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
        <span className={classNames("desktop-window", { front: isFront, 'z-20': isFront })} onClick={() => onClick(index)} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="window-titlebar select-none">
                <div className="window-title">
                    Project - {w.title}
                </div>
                <span className="buttons">
                    <div className="hover:bg-gray-600 hover:fill-white" onClick={(e) => {
                        onMinimize(index);
                        e.stopPropagation();
                    }}><MinimizeIcon /></div>
                    <div className="hover:bg-red-500 hover:fill-white" onClick={(e) => {
                        onClose(index);
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
