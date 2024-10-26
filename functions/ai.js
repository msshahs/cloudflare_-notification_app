// POST: /api/ai - Classify the notification using AI

// Helper function for managing CORS
function manageCORSForRequests() {
    return {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };
}

export async function onRequestPost({ request }) {
    try {
        const { text } = await request.json();

        const prompt = `Classify the given notification text into one of these categories: finance, weather, health, or technology. The text will clearly belong to one of these categories. Respond with only the category name in lowercase.\n\nNotification text: "${text}"`;

        // Call Workers AI API
        const response = await fetch('https://api.cloudflare.com/client/v4/workers/ai/llama-3-8b-instruct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const result = await response.json();
        const category = sanitizeAICategory(result.data.category);

        return new Response(JSON.stringify({ category }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                ...manageCORSForRequests()
            }
        });
    } catch (error) {
        return new Response("Error in AI categorization", { status: 500 });
    }
}

// Helper function to sanitize AI response category
function sanitizeAICategory(category) {
    return category.toLowerCase();
}
