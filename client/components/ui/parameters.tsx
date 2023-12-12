'use client'

import { Fragment } from "react";
import ParameterLine, { ParameterLineType } from "./parameter-line";

export default function Parameters({ items, title }: { items: ParameterLineType[], title?: string }) {
    return <div className="request-box">
        {
            <h4 className="font-bold">{title || 'Parameters (body):'}</h4>
        }
        <div className="flex flex-col gap-y-4">
            {
                items && items.length > 0 && items.sort((a: ParameterLineType, b: ParameterLineType) => b.required ? 1 : -1).map((line: ParameterLineType, i: number) => <Fragment key={i}>
                    <ParameterLine {...line} />
                </Fragment>)
            }
        </div>
    </div>
}