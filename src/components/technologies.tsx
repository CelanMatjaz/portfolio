import React from 'react'
import { TECHNOLOGIES } from '../data';

interface Props {
    onChange: (technologies: string[]) => void;
}

export const Technologies: React.FC<Props> = (props) => {
    const [inputs, setInputs] = React.useState(getInitialInputValues());

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newInputValues = { ...inputs, [e.target.id]: e.target.checked };
        setInputs(newInputValues);
        const filteredInputs = Object.entries(newInputValues).filter(([_, v]) => v).map(([k]) => k);
        props.onChange(filteredInputs)
    }, [inputs, props.onChange]);

    return (
        <div>
            {Object.entries(TECHNOLOGIES).map(([k, c], i) => <div key={i} className="mb-2">
                <span className="">{k}</span>
                <ul className="flex flex-row flex-wrap">{
                    c.sort((a, b) => a.localeCompare(b)).map((t, i) => <li key={i}>
                        <label htmlFor={t} className="select-none px-2 py-1">
                            <input className="p-1 pr-0" type="checkbox" id={t} checked={inputs[t]} onChange={onChange} />
                            <span className="pl-1">{t}</span>
                        </label>
                    </li>)
                }</ul></div>)}
        </div>
    )
}

const technologyInputs = Object.values(TECHNOLOGIES).reduce<{ [key: string]: boolean }>((prev, t) => {
    t.forEach(technology => prev[technology] = false);
    return prev;
}, {});

function getInitialInputValues() {
    return technologyInputs;
}
