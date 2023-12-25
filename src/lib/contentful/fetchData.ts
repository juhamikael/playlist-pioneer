import { client } from "./client";
/**
 * @param contentType - The content ID such as 'blogPost', can be found in the e.g. blogPost content field
 * @returns - The data from the content type
 */
export const getContentfulData = async (contentType: string) => {
    const response = await client.getEntries({
        content_type: contentType
    });

    return {
        props: {
            data: response.items,
            revalidate: 60
        }
    }

};
