document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('notification-form');
    const messageInput = document.getElementById('notification-message');
    const typeSelect = document.getElementById('notification-type');
    const notificationFeed = document.getElementById('notification-feed');

    // Submit notification
    document.getElementById('send-notification-btn').addEventListener('click', (event) => {
        event.preventDefault();

        const message = messageInput.value.trim();
        const type = typeSelect.value;

        if (!message || !type) {
            alert("Please fill in all fields");
            return;
        }

        // Simulate backend submission
        const timestamp = new Date().toLocaleString('en-US', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: 'numeric', minute: '2-digit', hour12: true
        });

        createNotification(message, type, timestamp);

        // Clear form fields after submission
        messageInput.value = '';
        typeSelect.value = '';
    });

    // Function to create notification card
    function createNotification(message, type, timestamp) {
        const notificationCard = document.createElement('div');
        notificationCard.classList.add('notification-card', type);

        const messageParagraph = document.createElement('p');
        messageParagraph.classList.add('notification-message');
        messageParagraph.textContent = message;

        const timestampDiv = document.createElement('div');
        timestampDiv.classList.add('notification-timestamp');
        timestampDiv.textContent = timestamp;

        notificationCard.appendChild(messageParagraph);
        notificationCard.appendChild(timestampDiv);
        notificationFeed.prepend(notificationCard);
    }

    // Auto-update notifications every 4 seconds (Extra Credit)
    setInterval(fetchNotifications, 4000);

    function fetchNotifications() {
        // Simulate fetching notifications from backend
        // This is where you'd make an API call in a real application
        console.log("Fetching new notifications...");
    }
});
