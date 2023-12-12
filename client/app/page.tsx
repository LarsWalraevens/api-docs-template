'use client';

import { siteData } from '@/app/site-data';
import Navigation from '@/components/layouts/navigation';
import { Fragment } from 'react';
import { Check, Copy } from 'react-feather';

export default function Home() {
  return (
    <>
      <Navigation />
      <main className='ml-[175px] flex flex-row justify-between items-start relative max-lg:mr-[2rem] max-lg:ml-[15px] max-lg:pt-[70px]'>
        <div className="py-8 w-full">

          {
            siteData.navigation.sort((a, b) => a.sort > b.sort ? 1 : -1).map((navParent, i) => <Fragment key={i}>
              {
                navParent.collapsable ? <>
                  <h2
                    title="Copy link to this section"
                    id={navParent.href}
                    onClick={() => navigator.clipboard.writeText(`${window.location.host}#${navParent.href}`)}
                    className='group flex cursor-pointer mb-4 !text-[1.7rem] font-bold'
                  ><code className='block mr-1 text-[##202530] '>#</code>{navParent.title}</h2>

                  <div>
                    {
                      !navParent.children ? null :
                        navParent.children.map((navChild, y) => <Fragment key={y}>
                          <ContentSection
                            subtitle={navChild.title}
                            href={navChild.href}
                            mainContent={navChild.content.main}
                            mainCode={navChild.content.mainCode}
                            method={navChild.method || null}
                          />
                        </Fragment>)
                    }
                  </div>
                </> :
                  <>
                    {
                      navParent.content &&
                      <ContentSection
                        title={navParent.title}
                        href={navParent.href}
                        mainContent={navParent.content.main}
                        // @ts-ignore
                        mainCode={navParent.content.mainCode}
                        method={null}
                      />
                    }
                  </>
              }

            </Fragment>)
          }
        </div>
        {/* BLACK BOX BACKGROUND */}
        <div className="bg-[#202530] right-0 top-0 absolute h-full min-h-screen w-[50%] max-lg:hidden" />
      </main>

    </>
  )
}

type CodeSnippet = {
  title?: string,
  content: string | JSX.Element | undefined
}

// CONTENT SECTION OF PAGE (content (left) & code (right))
function ContentSection(props: {
  title?: string,
  subtitle?: string,
  href: string,
  mainContent: JSX.Element | string,
  mainCode?: CodeSnippet[],
  method: string | null
}) {
  return <section className={`w-full mb-[40px]`}>
    <h2
      id={props.href}
      title="Copy link to this section"
      onClick={() => navigator.clipboard.writeText(`${window.location.host}#${props.href}`)}
      className={`group cursor-pointer mb-4 max-lg:mb-2 font-semibold text-[1.3rem] ${props.title && '!text-[1.7rem] !font-bold'}`}
    ><code className='inline-block mr-1 text-[##202530] '>#</code>{props.title || props.subtitle}

      {
        props.method && props.method.toUpperCase() === "POST" &&
        <code className="mx-2 text-sm text-[##202530] border border-green-600 px-1 rounded">POST</code>
      }
      {
        props.method && props.method.toUpperCase() === "GET" &&
        <code className="mx-2 text-sm text-red-600 border border-red-600 px-1 rounded">GET</code>
      }
    </h2>
    <div
      data-content-type="main"
      className={`flex flex-row flex-wrap max-lg:flex-column w-full max-lg:mb-5 `}
    >
      <div className={`w-[50%] lg:max-w-[50%] max-lg:w-full max-lg:mb-2 lg:pr-[50px] max-lg:pr-0 `}>
        {props.mainContent}
      </div>
      <div className="w-[50%] z-10 max-lg:w-full">
        {
          props.mainCode && props.mainCode.length > 0 &&
          props.mainCode.map((snippet, y) => <div key={y} className='mb-5 max-lg:mt-4'>
            {
              snippet.title && <h4 className='text-gray-200 inline-block p-1 px-3  rounded-t-[5px] relative lg:border-t lg:border-x border-black lg:bg-[#2b2b2b] lg:mb-[-2px] z-[100] max-lg:text-gray-600 mx-4 max-lg:mb-2 font-secondary lg:text-[0.9rem]'>{snippet.title}</h4>
            }
            <div className='p-0 text-gray-300 max-lg:w-full bg-[#2b2b2b] border-black/40 border-y overflow-x-auto relative z-[10]'>
              <div className="absolute top-3 right-4">
                <span
                  id={`code-action-copy-${y}`}
                  title="Copy code"
                >
                  <Copy
                    id='copy'
                    className='text-white hover:opacity-50 cursor-pointer'
                    onClick={() => {
                      navigator.clipboard.writeText(`${snippet.content}`);
                      var itemCopy = document.querySelector(`#code-action-copy-${y} #copy`);
                      var itemCheck = document.querySelector(`#code-action-copy-${y} #check`);

                      itemCopy?.classList.add("hidden")
                      itemCheck?.classList.remove("hidden")

                      setTimeout(() => {
                        itemCopy?.classList.remove("hidden")
                        itemCheck?.classList.add("hidden")
                      }, 2000);
                    }}
                    size={18}
                  />
                  <Check
                    size={18}
                    id="check"
                    className='text-white hidden'
                  />
                </span>
              </div>
              <div
                id="code-block"
              >
                {
                  snippet.content
                }
              </div>
            </div>
          </div>)
        }
      </div>
    </div>

  </section>
}