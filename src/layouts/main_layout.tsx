import React from 'react'
import { Outlet } from 'react-router'
import { Navigation } from '../components/navigation'

export const MainLayout: React.FC = () => {
    return (
        <>
            <Navigation />
            <main className="container mx-auto p-4 min-h-screen py-[120px]">
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

function Footer() {
    return <footer className="bg-gray-50 p-6 flex flex-col fixed bottom-0 w-screen dark:bg-gray-800">
        <div className="flex justify-center">
            Portfolio - Matjaž Čelan
        </div>
        <div className="flex justify-center">
            <small><a className="default-link" href="https://github.com/CelanMatjaz/portfolio" target="_blank">Portfolio Github repository</a></small>
        </div>
    </footer>
}
