const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        themeToggleBtn.textContent = '🌙'; // Suggest switching to Dark
    } else {
        body.classList.remove('light-mode');
        themeToggleBtn.textContent = '☀️'; // Suggest switching to Light
    }
}

function toggleTheme() {
    const isLight = body.classList.toggle('light-mode');
    if (isLight) {
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙'; // Suggest Dark
    } else {
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️'; // Suggest Light
    }
}

// ✅ Use event listener instead of inline onclick
themeToggleBtn.addEventListener('click', toggleTheme);

// ✅ Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);
