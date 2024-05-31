import { createBrowserRouter } from "react-router-dom";

import { Layout } from "./layout";
import { About } from "./pages/about";
import { Home } from "./pages/home";
import { Project } from "./pages/project";
import { Projects } from "./pages/projects";
import { Error404 } from "./pages/error_404";

export const router = createBrowserRouter([{
    path: '/',
    Component: Layout,
    children: [
        {
            path: '/',
            Component: Home
        },
        {
            path: 'home',
            Component: Home
        },
        {
            path: 'about',
            Component: About
        },
        {
            path: 'projects',
            Component: Projects,
            children: [
                {
                    path: ':projectId',
                    Component: Project,
                    errorElement: <Error404 />
                }
            ]
        },
    ],
    errorElement: <Error404 />
}]);
