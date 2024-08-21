import React from 'react';
import { Project, Window } from './types';
import { useQuery } from 'react-query';
import { ProjectsContext, WindowsContext } from './context';
import { Layout } from './layout';

function App() {
    const [windows, setWindows] = React.useState<Window[]>([]);

    const { data: projects } = useQuery<Project[]>({
        queryFn: async () => {
            const response = await fetch("/projects.json");
            return await response.json();
        },
        queryKey: ['projects'],
    });

    return (
        <ProjectsContext.Provider value={projects || []}>
            <WindowsContext.Provider value={{ windows, setWindows }} >
                <Layout />
            </WindowsContext.Provider>
        </ProjectsContext.Provider>
    );
}

export default App

