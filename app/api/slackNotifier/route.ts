// app/api/slackNotifier/route.ts
import { NextRequest } from 'next/server';

const webhookUrl = 'https://hooks.slack.com/services/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';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Slack');
        }

        return new Response(JSON.stringify({ message: 'Message sent to Slack' }), { status: 200 });
    } catch (error: any) {
        console.error('Error in /api/slackNotifier:', error.message); // 서버 에러 로그 추가
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
