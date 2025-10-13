// Current Time
function updateClock() {
    const now = new Date();

    // Format the time (HH:MM:SS) using 24-hour format
    const timeStr = now.toLocaleTimeString('en-US', { hour12: false });

    // Format the date (MM/DD/YYYY)
    const dateStr = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const clockElement = document.getElementById('current-time');

    if (clockElement) {
        // Output format: // MM/DD/YYYY HH:MM:SS EST (EST is added as a static label for terminal aesthetic)
        clockElement.textContent = `// ${dateStr} ${timeStr} EST`;
    }
}

// Start the clock: Update once immediately, then start the 1-second interval.
document.addEventListener('DOMContentLoaded', () => {
    updateClock();
    setInterval(updateClock, 1000);
});


// Welcome Message
const welcomeMsgElement = document.getElementById('welcome-message');
const originalText = welcomeMsgElement.textContent; // Store original text

welcomeMsgElement.addEventListener('mouseenter', () => {
    welcomeMsgElement.textContent = '!! ERROR !!'; // Change text on hover
});

welcomeMsgElement.addEventListener('mouseleave', () => {
    welcomeMsgElement.textContent = originalText; // Revert text on mouse leave
});
