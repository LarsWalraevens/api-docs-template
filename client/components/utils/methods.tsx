'use client'

import { CopyBlock, atomOneDark } from 'react-code-blocks';

export function printJson(code: { [key: string]: any }) {
    return <CopyBlock
        // @ts-ignore
        text={`${JSON.stringify(code, null, '\t')}`}
        language={"json"}
        showLineNumbers={true}
        theme={atomOneDark}
        wrapLongLines={true}
        codeBlock
    />
    // return <pre><code dangerouslySetInnerHTML={{ __html: prettyPrintJson.toHtml(code) }}></code></pre>
}

export function printHTML(code: JSX.Element) {
    return <CopyBlock
        // @ts-ignore
        text={`${code}`}
        language={"html"}
        showLineNumbers={true}
        theme={atomOneDark}
        wrapLongLines={true}
    />
}

export function printCSharp(code: string) {
    return <CopyBlock
        // @ts-ignore
        text={`${code}`}
        language={"csharp"}
        showLineNumbers={true}
        theme={atomOneDark}
        wrapLongLines={false}
        codeBlock
    />
}