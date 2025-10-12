document.addEventListener('DOMContentLoaded', () => {
    // Subtle glitch bars
    for (let i = 0; i < 12; i++) {
        const bar = document.createElement('div');
        bar.className = 'glitch-bar';
        bar.style.top = Math.random() * 100 + '%';
        bar.style.animationDuration = 0.05 + Math.random() * 0.25 + 's';
        document.body.appendChild(bar);
    }

    // Pixel jitter layer
    const jitter = document.createElement('div');
    jitter.className = 'pixel-jitter';
    document.body.appendChild(jitter);

    // Applicant name glitch + hover to ERROR
    const usernameSpan = document.getElementById('username');
    const username = localStorage.getItem('username') || "APPLICANT";
    usernameSpan.textContent = username;
    usernameSpan.setAttribute('data-text', username);

    const originalText = usernameSpan.textContent;

    usernameSpan.addEventListener('mouseenter', () => {
        usernameSpan.textContent = '!! ERROR !!';
    });

    usernameSpan.addEventListener('mouseleave', () => {
        usernameSpan.textContent = originalText;
    });
});
