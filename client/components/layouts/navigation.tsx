'use client'

import { siteData } from '@/app/site-data';
// import logoImg from "@/public/img/logo.png";
import Link from "next/link";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import { ArrowDownCircle, ArrowUpCircle, Menu, XCircle } from 'react-feather';

export default function Navigation() {
    const [expanded, setExpanded] = useState(false); // Currently not used
    const [isOpenMobile, setIsOpenMobile] = useState(false)

    return <>
        <MobileNavigation
            isOpenMobile={isOpenMobile}
            setIsOpenMobile={setIsOpenMobile}
        />
        <nav
            className={`h-screen bg-white py-4 max-lg:hidden fixed border-r-slate-[600/20] border-r overflow-y-auto ${expanded ? 'min-w-[300px] overflow-y-auto' : 'max-w-[170px] lg:w-[170px]'} duration-300 transition-all shadow-lg float-left`}
        >
            <h1 className='p-2'>YOUR LOGO</h1>
            <hr className="mt-4" />
            <div className="flex flex-col justify-start my-4">
                {
                    (siteData.navigation.sort((a, b) => a.sort > b.sort ? 1 : -1)).map((navParent: any, i: number) => <Fragment key={i}><NavParent
                        title={navParent.title}
                        collapsable={navParent.collapsable}
                        items={navParent.children}
                        href={navParent.href}
                        setIsOpenMobile={setIsOpenMobile}
                    /></Fragment>)
                }
            </div>
        </nav>
    </>
}

type NavChild = { title: string, href: string, method?: "post" | "get" }

function NavParent(props: {
    collapsable?: boolean,
    title: string,
    href?: string,
    items?: NavChild[],
    setIsOpenMobile: Dispatch<SetStateAction<boolean>>
}) {
    const [expanded, setExpanded] = useState(props.items && !props.collapsable ? true : false);

    return <>
        <div className={`${expanded && props.collapsable ? 'bg-gray-100 py-1 pb-2' : ''} max-lg:px-4 lg:px-3 ease-in-out mb-1 duration-300 w-full`}>

            {
                props.collapsable === false && props.href ?
                    <Link
                        href={props.href.includes("#") ? props.href : `#${props.href}`}
                        onClick={() => props.setIsOpenMobile(false)}
                        className={`font-semibold text-[13px] max-lg:text-[1.6rem] flex items-center select-none my-1.5 ${!props.collapsable && 'cursor-pointer hover:opacity-50'}`}
                    >
                        {props.title}
                    </Link> :
                    <p
                        className={`font-semibold text-[13px] max-lg:text-[1.6rem] flex items-center select-none my-1.5 ${!props.collapsable && props.href && 'cursor-pointer hover:opacity-50'}`}
                    >
                        {props.title}
                        <span
                            className={`hover:opacity-50 cursor-pointer mb-[-3px]`}
                            onClick={() => props.collapsable && setExpanded(!expanded)}
                        >
                            {!props.collapsable ? null : expanded ? <ArrowUpCircle className="mx-2 max-lg:scale-[1.5] max-lg:mx-4" size={17} /> : <ArrowDownCircle className="mx-2 max-lg:scale-[1.5] max-lg:mx-4" size={17} />}
                        </span>
                    </p>
            }
            {
                !expanded ? null :
                    props.items && <>
                        <div className="flex mx-1 flex-col">
                            {
                                (props.items).sort((a: any, b: any) => a.sort > b.sort ? 1 : -1).map((item: NavChild, i: number) => <Link
                                    key={i}
                                    className="inline-block border-b text-[13px] max-lg:text-[1.4rem] text-gray-600 last:border-none py-2 max-lg:py-3 max-lg:my-2 border-slate-400/20 hover:opacity-70"
                                    onClick={() => props.setIsOpenMobile(false)}
                                    href={item.href.includes("#") ? item.href : `#${item.href}`}
                                >
                                    {item.title}
                                    {
                                        item.method && item.method.toUpperCase() === "POST" &&
                                        <code className="text-[0.8em] text-green-600 border border-green-600 px-1 rounded ml-2">POST</code>
                                    }
                                    {
                                        item.method && item.method.toUpperCase() === "GET" &&
                                        <code className="text-[0.8em] text-red-600 border border-red-600 px-1 rounded ml-2">GET</code>
                                    }
                                </Link>)
                            }
                        </div>
                    </>
            }
        </div>
    </>
}

function MobileNavigation({ isOpenMobile, setIsOpenMobile }: { isOpenMobile: boolean, setIsOpenMobile: Dispatch<SetStateAction<boolean>> }) {

    return <>
        <div className="hidden max-lg:inline-block max-lg:fixed max-lg:w-full bg-white h-[65px] border-b-slate-300 border z-[100] max-lg:py-2">
            <div className='top-1/2 left-2 transform -translate-y-1/2 absolute'>
                <h1 className='p-2'>YOUR LOGO</h1>
            </div>
            <div onClick={() => setIsOpenMobile(!isOpenMobile)} id="hamburger-menu" className='absolute transform -translate-y-1/2 top-1/2 right-5 z-[10000]'>
                {
                    isOpenMobile ? <XCircle size={28} /> : <Menu size={28} />
                }
            </div>
            {
                isOpenMobile && <>
                    <div className="fixed min-h-screen h-full w-full min-w-screen bg-white z-[1000] top-0 overflow-y-auto">

                        <div className="flex flex-col justify-start items-start my-8">
                            {
                                (siteData.navigation.sort((a, b) => a.sort > b.sort ? 1 : -1)).map((navParent: any, i: number) => <Fragment key={i}><NavParent
                                    title={navParent.title}
                                    collapsable={navParent.collapsable}
                                    items={navParent.children}
                                    href={navParent.href}
                                    setIsOpenMobile={setIsOpenMobile}
                                /></Fragment>)
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    </>
}