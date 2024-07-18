'use client'

import { useId } from 'react';
import { Check, Copy } from 'react-feather';
export type CopyElementType = JSX.Element | string;
export default function CopyElement({ element }: { element: CopyElementType }) {
    const theId = useId();

    return <>
        <span id={`copy-element-${theId.replaceAll(":", "")}`} className="inline-block py-1 px-2 break-all text-[0.9rem] text-gray-700 italic bg-slate-100 border border-gray-400/50 rounded-md">
            {element}
            <span title='Copy element'>
                <Copy
                    id="copy"
                    className='text-gray-600 ml-2 hover:opacity-50 cursor-pointer inline-block'
                    onClick={() => {
                        navigator.clipboard.writeText(`${element}`);
                        const id = theId.replaceAll(":", "")
                        var itemCopy = document.querySelector(`#copy-element-${id} #copy`);
                        var itemCheck = document.querySelector(`#copy-element-${id} #check`);

                        itemCopy?.classList.add("hidden")
                        itemCheck?.classList.remove("hidden")

                        setTimeout(() => {
                            itemCopy?.classList.remove("hidden")
                            itemCheck?.classList.add("hidden")
                        }, 2000);
                    }}
                    size={14}
                />
                <Check
                    id="check"
                    size={14}
                    className='text-gray-600 inline-block ml-2 hidden'
                />
            </span>
        </span>
    </>
}