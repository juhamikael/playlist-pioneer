import { NextResponse } from 'next/server';

export const checkAuth = (userId: string, cookie: string) => {
    if (!userId) {
        return NextResponse.json({
            status: 400,
            message: "Missing userId parameter"
        });
    }

    if (!cookie) {
        return NextResponse.json({
            status: 401,
            message: "Unauthorized"
        });
    }
}