import React from 'react'
import './pages.css'

export const About = () => {
    return (
        <div className="about-container ">
            <div><img src="/profile_pic.png" alt="Github profile picture"/></div>
            <div>
                <h1 className="text-2xl mb-2">Hi, I'm Matjaž Čelan</h1>
                <p>
                    I am a passionate and experienced Full-Stack Developer, specializing in both frontend and backend development. With a deep understanding of modern web technologies, I create efficient, and visually appealing applications. My goal is to build intuitive and dynamic user experiences while ensuring robust and scalable backend systems. I also dabble in some graphics programming in C++ with Vulkan and OpenGL.
                </p>
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
                        <strong>Languages:</strong> NodeJS, PHP, C#, Go, Ruby
                    </div>
                    <div>
                        <strong>Frameworks:</strong> Express, Laravel, Ruby on Rails, .NET
                    </div>
                    <div>
                        <strong>Databases:</strong> PostgreSQL, MongoDB, Redis, RabbitMQ
                    </div>
                </div>
                <h2 className="text-xl mt-6 font-bold">
                    Other technologies
                </h2>
                <div>
                    Docker, Git
                </div>
            </div>
        </div>
    )
}
