export interface Project {
    id: number;
    title: string;
    description: string[];
    githubUrl: string;
    technologies: string[];
    imageUrls: string[];
}

export interface Task {
    projectId: number;
    imageUrl?: string;
};

export interface Transform {
    x: number;
    y: number;
}

export interface Window {
    id: number;
    title: string;
    children: JSX.Element;
    transform: Transform;
}
