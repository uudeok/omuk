// app/api/route.ts
import { NextResponse } from 'next/server';
import { sendSlackNotification } from '@/shared/lib/slack/slackNotifier';

export async function GET(request: Request) {
    try {
        // 요청 처리 로직
        return NextResponse.json({ message: 'Success!' });
    } catch (error: any) {
        // 에러 발생 시 슬랙으로 알림 전송
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
        // 에러 발생 시 슬랙으로 알림 전송
        await sendSlackNotification(
            `Error in POST /api/route: ${error instanceof Error ? error.message : 'Unknown error'}`
        );
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
