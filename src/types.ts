export interface Project {
    id: number;
    title: string;
    description: string[];
    githubUrl: string;
    technologies: string[];
    imageUrls: string[];
}

export type Projects = Project[];
