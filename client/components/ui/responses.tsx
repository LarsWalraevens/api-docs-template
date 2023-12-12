'use client'

import { Fragment } from "react";
import ResponseLine, { ResponseLineType } from "./response-line";

export default function Responses({ items, title }: { items: ResponseLineType[], title?: string }) {
    return <div className="request-box">
        {
            <h4 className="font-bold">{title || 'HTTP Status Codes (response):'}</h4>
        }
        <div className="flex flex-col gap-y-2.5">
            {
                items && items.length > 0 && items.map((line: ResponseLineType, i: number) => <Fragment key={i}>
                    <ResponseLine {...line} />
                </Fragment>)
            }
        </div>
    </div>
}