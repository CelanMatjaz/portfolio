import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities"
import React from "react";
import { Window } from "../types";
import { CrossIcon, MinimizeIcon } from "../assets/svg_icons";
import classNames from "classnames";

interface DesktopWindowProps {
    windowIndex: number;
    window: Window;
    isFront: boolean
    onClick: (index: number) => void;
    onClose: (index: number) => void;
}

export const DesktopWindow: React.FC<DesktopWindowProps> = (props) => {
    const { windowIndex, window: w, onClose, onClick, isFront } = props;

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.window.id,
        data: { windowIndex: props.windowIndex }
    });

    const style = {
        transform: CSS.Translate.toString(transform),
        top: props.window.transform.y,
        left: props.window.transform.x,
    };

    return (
        <span className={classNames("desktop-window", { front: isFront })} onClick={() => onClick(windowIndex)} ref={setNodeRef} style={style} {...listeners} {...attributes}>
            <div className="window-titlebar">
                <div className="window-title">
                    {w.title}
                </div>
                <span className="buttons">
                    <MinimizeIcon />
                    <div className="hover:bg-red-500 hover:text-white" onClick={() => onClose(w.id)}><CrossIcon /></div>
                </span>
            </div>
            {w.children}
        </span>
    );
}
