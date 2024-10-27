document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notification-form');
    const messageInput = document.getElementById('notification-message');
    const typeSelect = document.getElementById('notification-type');
    const notificationFeed = document.getElementById('notification-feed');

    // API URL (replace with actual URL)
    const API_BASE_URL = "https://my-first-worker.meethshah663.workers.dev";
    // const API_BASE_URL = "http://localhost:8787";


    // Submit Notification
    document.getElementById('send-notification-btn').addEventListener('click', async (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        const type = typeSelect.value;

        if (!message || !type) {
            alert("Please fill in all fields");
            return;
        }

        try {
            await createNotification({ type, content: { text: message }, read: false });
            messageInput.value = '';
            typeSelect.value = '';
            fetchNotifications(); // Refresh feed
        } catch (error) {
            console.error('Error creating notification:', error);
        }
    });

    // Create Notification API
    async function createNotification(notification) {
        const response = await fetch(`${API_BASE_URL}/api/notifications`, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify([notification]),
        });

        if (!response.ok) throw new Error('Failed to create notification');

        return await response.json();
    }

    // Fetch Notifications API
    async function fetchNotifications() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/notifications`);
            if (!response.ok) throw new Error('Failed to fetch notifications');

            const notifications = await response.json();
            renderNotifications(notifications);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    }

    // Delete All Notifications API
    async function deleteAllNotifications() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/notifications`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete notifications');

            alert("Notifications deleted successfully!");
            fetchNotifications(); // Refresh feed
        } catch (error) {
            console.error('Error deleting notifications:', error);
        }
    }

    // Render Notifications on the frontend
    function renderNotifications(notifications) {
        notificationFeed.innerHTML = ''; // Clear existing notifications

        notifications.forEach(notification => {
            const notificationCard = document.createElement('div');
            notificationCard.classList.add('notification-card', notification.type);

            const messageParagraph = document.createElement('p');
            messageParagraph.classList.add('notification-message');
            messageParagraph.textContent = notification.content.text;

            const timestampDiv = document.createElement('div');
            timestampDiv.classList.add('notification-timestamp');
            timestampDiv.textContent = new Date(notification.timestamp).toLocaleString('en-US', {
                day: '2-digit', month: 'short', year: 'numeric',
                hour: 'numeric', minute: '2-digit', hour12: true
            });

            notificationCard.appendChild(messageParagraph);
            notificationCard.appendChild(timestampDiv);
            notificationFeed.prepend(notificationCard);
        });
    }

    // Auto-update notifications every 4 seconds
    setInterval(fetchNotifications, 4000);

    // Initial Fetch
    fetchNotifications();
});