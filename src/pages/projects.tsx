import React from 'react'
import { Outlet, useParams } from 'react-router'
import { ProjectBrief } from '../components/project_brief';
import { Technologies } from '../components/technologies';
import { ProjectsContext } from '../App';

export const Projects = () => {
    const projects = React.useContext(ProjectsContext);
    const [filters, setFilters] = React.useState<string[]>([]);
    const { projectId } = useParams<{ projectId: string }>();

    const projectBriefs = React.useMemo(() => {
        const filteredProjects = filters.length === 0 ? projects : projects.filter(p => {
            for (const f of filters) {
                if(!p.technologies.includes(f)) return false;
            }
            return true;
        });
        return filteredProjects.map((p, i) => <li key={i}><ProjectBrief project={p} /></li>)
    }, [projects, filters]);

    const onTechnologiesChange = React.useCallback((selected: string[]) => {
        setFilters(selected);
    }, [setFilters]);

    return (
        <div className="projects flex flex-row gap-1">
            {projectId ?
                <Outlet context={projects.find(p => p.id.toString() == projectId)} /> :
                <>
                    <div style={{ width: '300px' }}>
                        <b>Technology filters</b>
                        <Technologies onChange={onTechnologiesChange} />
                    </div>
                    <div style={{ width: '100%' }}>
                        <ul>{projectBriefs}</ul>
                    </div>
                </>
            }
        </div>
    );
}


