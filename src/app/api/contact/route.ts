import { EmailTemplate } from '@/components/email-template';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';


const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const resend = new Resend(process.env.RESEND_API_KEY);
const companyEmail = process.env.COMPANY_EMAIL!;
export async function POST(req: NextRequest) {
    const accessToken = cookies().get("spotify-access-token");
    const body = await req.json();
    const { email: emailFrom, name, message } = body;

    try {
        if (!accessToken) {
            return NextResponse.json({
                status: 400,
                body: {
                    message: "You need to be logged in to access this route"
                }
            });
        }

        if (!emailFrom) {
            return NextResponse.json({
                status: 400,
                body: {
                    message: "Missing email parameter"
                }
            });
        }

        if (!name) {
            return NextResponse.json({
                status: 400,
                body: {
                    message: "Missing name parameter"
                }
            });
        }

        if (!message) {
            return NextResponse.json({
                status: 400,
                body: {
                    message: "Missing message parameter"
                }
            });
        }

        const { data, error } = await resend.emails.send({
            from: 'PlaylistPioneer <PlaylistPioneer@mail.juhamikael.info>',
            to: companyEmail,
            subject: `New Message from PlaylistPioneer - ${capitalize(name)}`,
            text: message,
            react: EmailTemplate({
                firstName: capitalize(name),
                message,
                emailFrom
            })
        });

        if (error) {
            console.log(error)
            return Response.json({ error }, { status: 500 });
        }

        return Response.json(data);
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
