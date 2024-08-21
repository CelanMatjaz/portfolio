import { ImageIcon } from "../assets/svg_icons";
import { Project } from "../types";
import { DesktopIcon } from "./desktop_icon";

interface DesktopIconProps {
    project: Project;
    onClick: (id: number) => void
    onDoubleClick: (project: Project) => void
    isSelected: boolean;
};

export const DesktopIconProject: React.FC<DesktopIconProps> = ({ project, onClick, onDoubleClick, isSelected }) => {
    return (
        <DesktopIcon onClick={() => onClick(project.id)} onDoubleClick={() => onDoubleClick(project)} isSelected={isSelected}>
            {project.imageUrls.length > 0 ? <img src={project.imageUrls[0]} /> : <ImageIcon />}
            <div className="title">
                {project.title}
            </div>
        </DesktopIcon>
    );
}
