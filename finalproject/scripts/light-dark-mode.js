document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;

    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
            themeToggleBtn.textContent = '🌙';
        } else {
            body.classList.remove('light-mode');
            themeToggleBtn.textContent = '☀️';
        }
    }

    function toggleTheme() {
        // Add temporary class for glitch effect
        body.classList.add('theme-switching');

        setTimeout(() => {
            const isLight = body.classList.toggle('light-mode');

            if (isLight) {
                localStorage.setItem('theme', 'light');
                themeToggleBtn.textContent = '🌙';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.textContent = '☀️';
            }

            // Remove flicker effect after animation ends
            setTimeout(() => {
                body.classList.remove('theme-switching');
            }, 400);
        }, 100);
    }

    // Load saved theme on startup
    loadTheme();

    // Use event listener instead of inline onclick
    themeToggleBtn.addEventListener('click', toggleTheme);
});
