'use client'

import CopyElement, { CopyElementType } from "./copy-element"
import { ParameterLineType } from "./parameter-line";
import Parameters from "./parameters";
import { ResponseLineType } from "./response-line";
import Responses from "./responses";

export default function ContentBlock(props: {
    endpoint?: CopyElementType;
    description?: string | JSX.Element;
    parameters?: ParameterLineType[];
    responses?: ResponseLineType[];
}) {
    const defaultClassname = "mb-6"

    return <>
        {
            props.endpoint ? <div className={defaultClassname}><CopyElement element={props.endpoint} /></div> : null
        }
        {
            props.description ? <div className={defaultClassname}>
                <b className="block">Description:</b>
                <span>
                    {props.description}
                </span>
            </div> : null
        }
        {
            props.parameters && props.parameters.length > 0 ?
                <div className={defaultClassname}>
                    <Parameters
                        items={props.parameters || []}
                    />
                </div> : null
        }
        {
            props.responses && props.responses.length > 0 ?
                <div className={defaultClassname}>
                    <Responses
                        items={props.responses || []}
                    />
                </div> : null
        }
    </>
}