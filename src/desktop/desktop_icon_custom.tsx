import classNames from "classnames";
import { ImageIcon } from "../assets/svg_icons";
import { Project } from "../types";

interface DesktopIconProps {
    project: Project;
    onClick: (id: number) => void
    onDoubleClick: (id: number) => void
    isSelected: boolean;
};

export const DesktopIcon: React.FC<DesktopIconProps> = ({ project, onClick, onDoubleClick, isSelected }) => {
    return (
        <div className={classNames("desktop-icon", { selected: isSelected })} onClick={() => onClick(project.id)} onDoubleClick={() => onDoubleClick(project.id)}>
            {project.imageUrls.length > 0 ? <img src={project.imageUrls[0]} /> : <ImageIcon />}
            <div className="title">
                {project.title}
            </div>
        </div>
    );
}
