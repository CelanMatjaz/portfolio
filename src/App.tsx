import { Project } from './types';
import { ProjectsContext } from './context';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import React from 'react';

const queryClient = new QueryClient();

function App() {
    const { data: projects } = useQuery<Project[]>({
        queryFn: async () => {
            const response = await fetch("/projects.json");
            return await response.json();
        },
        queryKey: ['projects'],
    });

    return (
        <ProjectsContext.Provider value={projects || []}>
            <RouterProvider router={router} />
        </ProjectsContext.Provider>
    );
}

export function AppWrapper() {
    return (
        <React.StrictMode >
            <QueryClientProvider client={queryClient} >
                <App />
            </QueryClientProvider >
        </React.StrictMode >
    );
}

export default App

