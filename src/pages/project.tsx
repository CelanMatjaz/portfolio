import React from 'react'
import { useLoaderData, useOutletContext } from 'react-router-dom';
import { Project as ProjectType } from '../types';
import { Error404 } from './error_404';
import { ImageSlides } from '../components/image_slides';

export const Project = (props: {}) => {
    const project = useOutletContext<ProjectType>();

    if (!project) return <Error404 />

    return (
        <div>
            <div className="mb-4">
                <h1 className="text-4xl mb-2">{project.title}</h1>
            </div>
            <div className="mb-4">
                <ImageSlides imageUrls={project.imageUrls} />
            </div>
            <div className="mb-4">
                <a href={project.githubUrl} target="_blank" className="default-link">Project repository</a>
            </div>
            <div className="mb-4">
                <strong>Technologies used: </strong>{project.technologies.join(', ')}
            </div>
            <div>
                {project.description.map((d, i) => <p key={i} className="mb-3">{d}</p>)}
            </div>
        </div>
    )
}
