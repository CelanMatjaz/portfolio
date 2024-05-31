import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { Project } from './types';

export const ProjectsContext = React.createContext<Project[]>([]);

function App() {
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        async function fetchProjects() {
            try {
                const res = await fetch('/projects.json');
                const data = await res.json();
                setProjects(data);
            }
            catch { }
        }

        fetchProjects();
    }, []);

    return (
        <React.StrictMode>
            <ProjectsContext.Provider value={projects}>
                <RouterProvider router={router}></RouterProvider>
            </ProjectsContext.Provider>
        </React.StrictMode>
    );
}

export default App

