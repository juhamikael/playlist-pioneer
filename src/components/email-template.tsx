import * as React from 'react';
import { Montserrat } from "next/font/google";
import { cn } from '@/lib/utils';

const font = Montserrat({ subsets: ["latin"] });

const readTime = (content: string, textLength: number) => {
    const wordsPerMinute = 230;

    if (textLength < 10) {
        return `Under 1 minute`;
    }
    const minutes = Math.ceil(textLength / wordsPerMinute);
    return `${minutes} minute${minutes > 1 ? 's' : ''}`;
}

interface EmailTemplateProps {
    firstName: string;
    message: string;
    emailFrom: string;
}

const convertLinksAndLineBreaks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split('\n').map(line =>
        line.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return <a key={index} href={part} target="_blank" rel="noopener noreferrer">{part}</a>;
            }
            return part;
        })
    );

    return parts.map((lineParts, index) => (
        <React.Fragment key={index}>
            {lineParts}
            <br />
        </React.Fragment>
    ));
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName, message, emailFrom
}) => {
    const totalWords = message.split(' ').length;
    const formattedMessage = convertLinksAndLineBreaks(message);

    return (
        <html className={cn(font.className)}>
            <div>
                <div>
                    <h1
                        style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            lineHeight: 1.2,
                            letterSpacing: "-0.05rem",
                        }}
                    >
                        <span style={{ color: "#15803d" }}>Playlist</span>
                        <span>Pioneer</span>
                    </h1>
                    <p
                        style={{
                            fontSize: "1rem",
                            fontWeight: 400,
                            lineHeight: 1.5,
                            letterSpacing: "-0.025rem",
                            color: "#333",
                        }}
                    >
                        You have a new message from <span style={{ fontWeight: 700 }}>{firstName} {`<${emailFrom}>`}</span>
                    </p>

                    <div style={{
                        fontSize: "0.875rem",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        letterSpacing: "-0.025rem",
                        color: "#333",
                        marginBottom: "1rem"
                    }}>
                        Total words: {totalWords}
                        <br />
                        Read time: {readTime(message, totalWords)}
                    </div>
                    <div
                        style={{
                            width: "100%",
                            height: "1px",
                            backgroundColor: "rgba(209, 213, 219, 0.8)",
                            margin: "1rem 0"
                        }}
                    />
                    <p className="text-lg">{formattedMessage}</p>
                </div>
            </div>
        </html>
    );
}
