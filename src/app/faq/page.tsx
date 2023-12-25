import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getContentfulData } from "@/lib/contentful/fetchData";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { INLINES, Document, Block, Inline } from '@contentful/rich-text-types';

const FAQ = async () => {
    const response = await getContentfulData("faq");
    const data = response.props.data;

    if (!data) {
        return null;
    }

    const faq = data.map((item) => {
        const id = typeof item.fields.id === 'number' ? item.fields.id : 0;
        return {
            question: item.fields.question as string,
            answer: item.fields.answer as Document,
            id: id,
        };
    }).sort((a, b) => a.id - b.id);

    const options = {
        renderNode: {
            [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => {
                return <a target="_blank" rel="noopener noreferrer" href={node.data.uri}>{children}</a>;
            }
        }
    };

    return (
        <MaxWidthWrapper className="prose px-10">
            <h1>FAQ</h1>
            <Accordion type="single" collapsible>
                {faq.map((item, index) => (
                    <AccordionItem key={item.id} value={`item-${index}`}>
                        <AccordionTrigger className="text-base text-start">{item.question}</AccordionTrigger>
                        <AccordionContent>
                            {documentToReactComponents(item.answer, options)}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </MaxWidthWrapper>
    );
};

export default FAQ;
