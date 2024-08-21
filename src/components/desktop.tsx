import { useDroppable } from "@dnd-kit/core";
import React from "react";
import { DesktopIconProject } from "./desktop_icon_project";
import { ProjectsContext } from "../context";
import { Project } from "../types";

interface DesktopProps {
    onOpenWindow: (project: Project) => void;
};

export const Desktop: React.FC<React.PropsWithChildren<DesktopProps>> = ({ onOpenWindow, children }) => {
    const projects = React.useContext(ProjectsContext);
    const [selectedProjectId, setSelectedProjectId] = React.useState<number>(-1);

    const { setNodeRef } = useDroppable({
        id: 'desktop'
    });

    const onIconClick = React.useCallback((id: number) => {
        setSelectedProjectId(id);
    }, []);

    const onIconDoubleClick = React.useCallback((project: Project) => {
        setSelectedProjectId(project.id);
        onOpenWindow(project);
        setSelectedProjectId(-1);
    }, []);

    return (
        <div ref={setNodeRef}>
            <div className="desktop">
                {projects.map((project, i) => <DesktopIconProject
                    key={i}
                    project={project}
                    onClick={onIconClick}
                    onDoubleClick={onIconDoubleClick}
                    isSelected={project.id === selectedProjectId}
                />)}
            </div>
            {children /* Windows */}
        </div>
    );
}
