'use client'

import ContentBlock from "@/components/ui/content-block";
import { printCSharp, printJson } from "@/components/utils/methods";

/**
 * ? WHAT IS THIS
 * This object below has an object with a navigation property where we put our site navigation in there AND it's content
 * It means that if you want to add or edit content, you'll have to change it in "siteData" json variable
 * ? HOW TO ADD CONTENT
 * Add content by filling in the json format below, ill explain the properties and what they do:
 * {
 *  sort: sorted in site navigation by number
 *  href?: nav parent can have a href tag that allows the user to easily navigate to that section
 *  title: navigation & content title of this content section
 *  children: if nav parent has sub navigations then you'll use this
 *          {
 *              ...props of content property,
 *              method: 'post' / 'get' - to have this visually labeled as these types of requests
 *          }          
 *  content: actual content of page
 *         {
 *              main: Content in HTML that explains the code
 *              mainCode: Array of content in HTML that is the example code (USE METHODS LIKE printHTML, printJSON and printCSharp)
 *          }
 * }
 */
export const siteData = {
    navigation: [
        {
            sort: 1,
            collapsable: false,
            href: "getting-started",
            title: "Getting started",
            content: {
                main: <>
                    <b>Overview</b>
                    <p>Our API allows your application to connect to internal application functionality.</p>
                    <p>Our current implementation involves features such as:</p>
                    <ul>
                        <li>- Connecting your applicants to your profile.</li>
                    </ul>
                    <br />
                    <b>API Keys</b>
                    <p>In order to access the API endpoints, you must use an API key. Our API does not support sessions, so this key must be supplied with each request.</p>
                    <p>Only <b>ADMINS</b> can see the API key of your profile.</p>
                    <br />
                    <b>Request & Response Format</b>
                    <p>All requests are made using <b>GET</b> or <b>POST</b> methods. A <b>POST</b> requires a <b>JSON</b> encoded object.</p>
                    <p>Date and time arguments will always be handled in <b>UTC</b>.</p>
                    <br />
                    <p>Requests must be made to the following URL:</p>
                    <p>https://api-example.com/api/<b>__VERSION__</b>/office/keys/<b>__API_KEY__</b></p>
                    <br />
                    <p>Our API responses contain the following structure:</p>
                    <ul>
                        <li>- <b>Status</b> ~ An result condition returned by the API.</li>
                        <li>- <b>Instance</b> ~ The result value. Usually a defined object, otherwise a string containing detailed information.</li>
                    </ul>
                    <br />
                    <b>API Usage Limitations</b>
                    <p>Per minute limit: 100 API Requests</p>
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
                    method: "Post",
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
                                        default: "NL",
                                        type: "string",
                                        description: "This is the 2-character ISO-code of a language.<br/>Options: EN, NL, FR"
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