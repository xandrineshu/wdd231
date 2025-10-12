const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

/**
 * Applies the saved theme preference from localStorage or defaults to dark.
 */
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙'; // Show Moon when in Light Mode (to suggest switching to Dark)
    } else {
        body.classList.remove('light-mode');
        themeToggleBtn.textContent = '☀️'; // Show Sun when in Dark Mode (to suggest switching to Light)
    }
}

/**
 * Toggles between 'light-mode' and 'dark-mode'.
 */
function toggleTheme() {
    const isLight = body.classList.toggle('light-mode');

    if (isLight) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙'; // Set icon to Moon for dark mode suggestion
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️'; // Set icon to Sun for light mode suggestion
    }
}
