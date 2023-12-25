import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { getContentfulData } from "@/lib/contentful/fetchData"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from '@contentful/rich-text-types';
import { proseClassName } from "@/styles/prose";
import { cn } from "@/lib/utils";
import Divider from "@/components/global/Divider";
import { Contact } from "@/components/Contact";
const AboutPage = async ({ }) => {
    const response = await getContentfulData("aboutUsPage")
    const data = response.props.data[0];
    if (!data) {
        return null
    }

    const story = data.fields?.story as Document;
    const future = data.fields?.future as Document;
    if (!story || typeof story !== 'object' || !story.nodeType) {
        return null;
    }

    return (
        <MaxWidthWrapper className={cn("prose", proseClassName, "px-10")}>
            <div>
                <h1>About</h1>
                {documentToReactComponents(story)}
            </div>
            <Divider className="my-8" />
            <div>
                <h1>{"What's next?"}</h1>
                {documentToReactComponents(future)}
            </div>
            <Divider className="my-8" />
            <Contact />
        </MaxWidthWrapper >
    );
};

export default AboutPage;
