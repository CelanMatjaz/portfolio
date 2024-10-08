import { Link } from 'react-router-dom'

export const Error404 = () => {
    return (
        <div className="text-center pt-10 w-full">
            <h1 className="text-5xl">404</h1>
            <p>Page does not exist</p>
            <Link to="/portfolio" className="default-link">Back to home</Link>
        </div>
    )
}
