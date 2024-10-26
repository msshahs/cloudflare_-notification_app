// Helper function for managing CORS
function manageCORSForRequests() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}


export async function onRequestGet() {
    const preferences = {
        displayDuration: 5000,
        preferredTypes: ["alert", "info"]
    };

    return new Response(JSON.stringify(preferences), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': `preferences=${JSON.stringify(preferences)}; Path=/api/notifications/cookie; Max-Age=2516100`,
            ...manageCORSForRequests()
        }
    });
}
