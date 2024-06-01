import React from 'react'
import { Project } from '../types';
import { Link } from 'react-router-dom';

interface Props {
    project: Project;
}

export const ProjectBrief = (props: Props) => {
    const { id, title, technologies, imageUrls } = props.project;

    return (
        <Link className="project-brief" to={React.useMemo(() => `/projects/${id}`, [id])}>
            {imageUrls.length > 0 && <div className="project-brief-image-container">
                <img className="project-brief-image" src={imageUrls[0]} />
            </div>}
            <div className="project-brief-details">
                <div className="project-brief-title">{title}</div>
                <div className="project-brief-technologies">{technologies.join(', ')}</div>
            </div>
        </Link>
    )
}
