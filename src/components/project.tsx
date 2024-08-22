import { GithubIcon } from "../assets/svg_icons";
import { Project as ProjectType } from "../types";
import { ImageSlides } from "./image_slides";

interface ProjectProps {
    project: ProjectType;
}

export const Project: React.FC<ProjectProps> = ({ project }) => {
    return (
        <div>
            <div className="mb-4">
                <h1 className="text-4xl mb-2">{project.title}</h1>
            </div>
            {project.imageUrls.length > 0 && <div className="mb-4">
                <ImageSlides imageUrls={project.imageUrls} />
            </div>}
            <div className="mb-4 flex items-center">
                <GithubIcon />
                <a href={project.githubUrl} target="_blank" className="ml-2 default-link"> Project repository</a>
            </div>
            <div className="mb-4">
                <strong>Technologies used: </strong>{project.technologies.join(', ')}
            </div>
            <div>
                {project.description.map((d, i) => <p key={i} className="mb-2">{d}</p>)}
            </div>
        </div>
    )
}
