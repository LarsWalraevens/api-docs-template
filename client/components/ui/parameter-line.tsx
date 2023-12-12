'use client'

import { Badge } from "./badge"

export interface ParameterLineType {
    item: string,
    required?: boolean,
    default?: string,
    type: string,
    description: string,
    className?: string,
}

export default function ParameterLine(props: ParameterLineType) {
    const labelClasses = `text-[0.9rem] text-slate-500 mr-2 cursor-help`
    return <>
        <p className={`flex items-start flex-col ${props.className || ''}`}>
            <span className="flex flex-row items-center flex-wrap mb-2">
                <Badge className="mr-3 text-[0.9rem]">{props.item}</Badge>
                <code
                    title={props.required ? "Parameter is required to use" : 'Parameter is optional to use'}
                    className={`${labelClasses}`}
                >
                    {props.required ? "(Required)" : '(Optional)'}
                </code>
                <code
                    className={`${labelClasses}`}
                    title="Parameter C# data type"
                >
                    {props.type}
                </code>
                <code
                    className={`${labelClasses} text-red-500`}
                    title="Parameter default value"
                >
                    {props.default ? ` | Default ~ ${props.default}` : ""}
                </code>
            </span>
            <span className="text-[0.95rem] border-gray-300 ml-2 py-1 pl-0 font-secondary">{props.description}</span>
        </p>
    </>
}