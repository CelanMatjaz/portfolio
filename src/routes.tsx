import { createHashRouter } from "react-router-dom";

import { MainLayout } from "./layouts/main_layout";
import { About } from "./pages/about";
import { Projects } from "./pages/projects";
import { Error404 } from "./pages/error_404";
import { Project } from "./pages/project";
import { DemoLayout } from "./layouts/demo_layout";
import { DesktopLayout } from "./demos/desktop/desktop_layout";
import { Demos } from "./pages/demos";

export const router = createHashRouter([
    {
        path: 'd',
        Component: DemoLayout,
        children: [
            {
                path: 'desktop',
                Component: DesktopLayout
            }
        ]
    },

    {
        path: '/',
        Component: MainLayout,
        children: [
            {
                path: '/',
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
            {
                path: 'demos',
                Component: Demos
            },
        ],
        errorElement: <Error404 />
    },
]);
