// app/route.ts
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

async function sendSlackNotification(message: string) {
    const webhookUrl = 'https://hooks.slack.com/services/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';

    if (!webhookUrl) {
        console.error('Slack webhook URL is not set');
        return;
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: message }),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Slack');
        }
    } catch (error: any) {
        console.error('Error sending message to Slack:', error.message);
    }
}

export async function GET(request: Request) {
    try {
        // 요청 처리 로직
        return NextResponse.json({ message: 'Success!' });
    } catch (error: any) {
        await sendSlackNotification(
            `Error in GET /api/route: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        // 요청 처리 로직
        return NextResponse.json({ message: 'Data received!' });
    } catch (error: any) {
        await sendSlackNotification(
            `Error in POST /api/route: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
