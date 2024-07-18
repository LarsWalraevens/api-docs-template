'use client'

import ContentBlock from "@/components/ui/content-block";
import { printCSharp, printJson } from "@/components/utils/methods";
import { AlertCircle } from "react-feather";
import { CodeSnippet } from "./page";

/**
 * ? WHAT IS THIS
 * This (type-safe) object below has an object with a navigation property where we put our site navigation in there AND it's content
 * It means that if you want to add or edit content, you'll have to change it in "siteData" json variable
 * 
 * ? HOW TO ADD CONTENT
 * Add content by filling in the json format below (variable: siteData), check type-interface for details information about what the properties do
 */


/**
 * Interface for a site data item.
 * This is used to represent a section of the site, with its navigation and content.
 */
export interface SiteDataItem {
    // Sort order in site navigation and page.
    sort: number;
    // Whether the item can be collapsed in the navigation.
    collapsable?: boolean;
    // URL for the item in the navigation. Allows the user to easily navigate to this section.
    href?: string;
    // Title of the item in the navigation and content.
    title: string;
    // Child items of the navigation item. If present, the parent item will have sub-navigation.
    children?: {
        // Sort order in site navigation and page. Higher numbers are sorted higher.
        sort: number;
        // URL for the child item in the navigation. Allows the user to easily navigate to this section.
        href: string;
        // Title of the child item in the navigation and content.
        title: string;
        // HTTP method of the child item. Will be visually labeled in the navigation.
        method?: "post" | "get";
        // Content of the child item.
        content: {
            // Main content of the child item. Explains the code.
            main: JSX.Element;
            // Array of content in HTML that is the example code. Use methods like printHTML, printJSON and printCSharp.
            mainCode?: CodeSnippet[];
        };
    }[];
    // Content of the item. If present, it will be displayed in the page.
    content?: {
        // Main content of the item. Explains the code.
        main: React.ReactElement;
        // Array of content in HTML that is the example code. Use methods like printHTML, printJSON and printCSharp.
        mainCode?: CodeSnippet[];
    };
}

export const siteData: {
    navigation: SiteDataItem[];
} = {
    navigation: [
        {
            sort: 1,
            collapsable: false,
            href: "getting-started",
            title: "Getting started",
            content: {
                main: <>
                    <div className="lg:border-2 border-y-2 border-red-700 bg-red-600 shadow-md max-lg:my-3 rounded p-4">
                        <b className="text-white flex items-center mb-2"><AlertCircle className="inline-block mr-2" size={18} /> THIS IS AN API DOCS EXAMPLE SITE</b>
                        <p className="text-white/80 mb-3">You can use this template and get the code at the following link: <a className="link font-bold !text-white" href="https://github.com/LarsWalraevens/api-docs-template">https://github.com/LarsWalraevens/api-docs-template</a></p>
                        <p className="text-white/80 mb-3">Tech stack: <em>NextJS, TailwindCSS, TypeScript</em></p>
                        <p className="text-white/80 italic font-semibold" style={{ fontSize: "1.1rem" }}>~ Happy coding!</p>
                    </div>
                    <br />
                    <b>Overview</b>
                    <p>Our API allows your application to connect to internal application functionality.</p>
                    <br />
                    <b>Feedback</b>
                    <p>We value the feedback of our clients. We want to provide a developer experience that allows for a seamless integration, but we need your help! If you have any questions, comments, or ideas for our API, please contact support.</p>
                </>
            }
        },
        {
            sort: 2,
            collapsable: true,
            href: "applicant",
            title: "Applicants",
            children: [
                {
                    sort: 1,
                    href: "applicant-update",
                    title: "Connect applicant email",
                    method: "post",
                    content: {
                        main: <>
                            <ContentBlock
                                endpoint={'https://api.example/api/v4/office/keys/{keyId}/invite/applicant'}
                                description={<>Use this endpoint to connect the applicant and have your company marked for this applicant.<br />If the applicant is already connected, it will just mark your company to this applicant.</>}
                                parameters={[
                                    {
                                        item: "ApplicantEmail",
                                        required: true,
                                        type: "string",
                                        description: "This is the the email of the applicant."
                                    },
                                    {
                                        item: "LanguageIsoCode",
                                        type: "string",
                                        description: "This is the 2-character ISO-code of a language. Options: EN, NL, FR"
                                    },
                                ]}
                                responses={[
                                    { color: 'green' },
                                    { color: 'yellow', status: "261", description: "The API key provided is invalid." },
                                    { color: 'yellow', status: "262", description: "A 100 calls per minute threshold has been reached for your API key. Try to make sure you do not exceed this threshold." },
                                    { color: 'yellow', status: "265", description: "A required body parameter is missing." },
                                    { color: 'red', status: "269", description: "A bug report has been logged, no need to take action yourself." },
                                    { color: 'red', status: "400", description: "An undocumented error has occured. A bug report has been logged, but we appreciate contacting us for providing more information." },
                                    { color: 'red', status: "401", description: "You are unauthorized to use this endpoint." },
                                    { color: 'black', description: "An undocumented error happened.", hasSupportLink: true },
                                ]}
                            />
                        </>,
                        mainCode: [
                            {
                                title: "Body:",
                                content: <>
                                    {printJson({
                                        ApplicantEmail: "applicant@email.com",
                                        LanguageIsoCode: "NL"
                                    })}
                                </>
                            },
                            {
                                title: "C# Example:",
                                content: <>
                                    {printCSharp('public class ApiResponse\n{\n\t\tpublic int Status { get; }\n}\n\n/* ***** */\n\nusing (HttpClient client = new HttpClient())\n{\n\t\tHttpResponseMessage authResponse = await client.PostAsync(new Uri(__ENDPOINT__), new StringContent(JsonConvert.SerializeObject(new { __BODY__ }), Encoding.UTF8, MediaTypeNames.Application.Json));\n\t\tApiResponse response = JsonConvert.DeserializeObject<ApiResponse>(await authResponse.Content.ReadAsStringAsync());\n\t\treturn response;\n}')}
                                </>
                            },
                            {
                                title: "200 Response:",
                                content: <>
                                    {printJson({
                                        Status: 200,
                                    })}
                                </>
                            }
                        ]
                    }
                },
            ]
        },
    ]
}