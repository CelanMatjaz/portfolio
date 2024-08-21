import React from "react";
import { Project, Window } from "./types";

export const ProjectsContext = React.createContext<Project[]>([]);

interface WindowsContextType {
    windows: Window[];
    setWindows: React.Dispatch<React.SetStateAction<Window[]>>;
}

const windowsContextDefault: WindowsContextType = {
    windows: [],
    setWindows: () => {
        new Error("Something went wrong");
    }
}

export const WindowsContext = React.createContext<WindowsContextType>(windowsContextDefault);
