export async function sendSlackNotification(message: any) {
    const webhookUrl = process.env.SLACK_WEBHOOK_URL;

    if (!webhookUrl) {
        console.error('Slack webhook URL is not set');
        return;
    }

    const payload = {
        text: message,
    };

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error('Failed to send message to Slack');
        }
    } catch (error) {
        console.error('Error sending message to Slack:', error);
    }
}
