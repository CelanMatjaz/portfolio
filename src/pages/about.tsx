import './pages.css'
import { Link } from 'react-router-dom'

export const About = () => {
    return (
        <div className="about-container ">
            <div><img src="/profile_pic.png" alt="Github profile picture" /></div>
            <div>
                <h1 className="text-2xl mb-2">Hi, I'm Matjaž Čelan</h1>
                <p>
                    I am a passionate and experienced Full-Stack Developer, specializing in both frontend and backend development. With a deep understanding of modern web technologies, I create efficient, and visually appealing applications. My goal is to build intuitive and dynamic user experiences while ensuring robust and scalable backend systems. I also dabble in some graphics programming in C++ with Vulkan and OpenGL.
                </p>
                <p>
                    My editor of choice is Neovim, you can look at my config <a className="default-link" href="https://github.com/CelanMatjaz/nvim.config" target="_blank">here</a>.
                </p>
                <p>Check out some of my <Link to="/projects" className="default-link">projects</Link></p>
                <h2 className="text-xl mt-6 font-bold">
                    Frontend Development
                </h2>
                <p>
                    Crafting beautiful and responsive interfaces with a keen eye for detail.
                </p>
                <div>
                    <div>
                        <strong>Languages:</strong> HTML, CSS, JavaScript, TypeScript
                    </div>
                    <div>
                        <strong>Frameworks:</strong> React, Angular, Vue
                    </div>
                    <div>
                        <strong>Tools:</strong> SASS, LESS, Bootstrap, Tailwind CSS, HTMX
                    </div>
                </div>
                <h2 className="text-xl mt-6 font-bold">
                    Backend Development
                </h2>
                <p>
                    Building powerful and scalable server-side applications.
                </p>
                <div>
                    <div>
                        <strong>Languages:</strong> Javascript/Typescript, PHP, C#, Go, Ruby
                    </div>
                    <div>
                        <strong>Frameworks:</strong> Express, Next, Laravel, Ruby on Rails, .NET
                    </div>
                    <div>
                        <strong>Databases:</strong> PostgreSQL, MongoDB, Redis, RabbitMQ
                    </div>
                    <div>
                        <strong>Other:</strong> Docker, Git, Github Actions
                    </div>
                </div>
                <h2 className="text-xl mt-6 font-bold">
                    Other technologies
                </h2>
                <p>
                    Creating console/desktop applications as well as mobile apps.
                </p>
                <div>
                    <strong>Languages:</strong> C++, C, Java, Kotlin
                </div>
            </div>
        </div>
    )
}
