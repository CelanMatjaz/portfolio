import { Link, createHashRouter } from "react-router-dom";

import { Layout } from "./layout";
import { Desktop } from "./desktop/desktop";

export const router = createHashRouter([{
    path: '/',
    Component: Layout,
    children: [
        {
            path: '*',
            Component: Desktop
        },
    ],
    errorElement: <Error404 />
}]);

function Error404() {
    return (
        <div className="text-center pt-10 w-full">
            <h1 className="text-5xl">404</h1>
            <p>Page does not exist</p>
            <Link to="/" className="default-link">Back to home</Link>
        </div>
    )
}
