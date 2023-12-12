'use client'

import { Badge } from "./badge";

type ResponseLineColors = "green" | "yellow" | "black" | "red"

export interface ResponseLineType {
    color: ResponseLineColors,
    description?: string | JSX.Element,
    status?: number | string,
    className?: string,
    hasSupportLink?: boolean
}

export default function ResponseLine(props: ResponseLineType) {
    const supportLinkText = <>Please file a issue report <a className="link" href={`mailto:${`info@example.com?subject=API documentation issue&body=We found an issue for endpoint: __ENDPOINT__`}`}>HERE</a>.</>
    const statusStyling: any = {
        green: {
            badgeClasses: "border-green-500 text-green-500",
            defaultBadgeStatus: 200,
            defaultDescription: "A success result which also carries a response object."
        },
        black: {
            badgeClasses: "border-gray-500 text-gray-500",
            defaultBadgeStatus: 500,
            defaultDescription: <>An undocumented error happened. {supportLinkText}</>
        },
        yellow: {
            badgeClasses: "border-yellow-600 text-yellow-700",
            defaultBadgeStatus: 400,
            defaultDescription: <>Something happened, check the return debug object for more information. </>
        },
        red: {
            badgeClasses: "border-red-500 text-red-500",
            defaultBadgeStatus: 500,
            defaultDescription: <>An undocumented error happened.</>
        }
    }

    const data = statusStyling[props.color] || statusStyling.green

    return <>
        <div className={`flex items-start flex-nowrap ${props.className || ''}`}>
            <Badge variant={"outline"} className={`font-normal px-1 rounded max-lg:mr-3 ${data.badgeClasses}`}>
                <code>{props.status || data.defaultBadgeStatus}</code>
            </Badge>
            <div className="border-t max-lg:hidden border-t-gray-300 border my-2.5 w-3 mx-2 mr-3"></div>
            <p className="font-secondary text-[0.95rem]">{props.description || data.defaultDescription} {props.hasSupportLink && supportLinkText}</p>
        </div>
    </>
}