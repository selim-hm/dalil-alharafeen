const Theme = (function() {
    function init() {
        const isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.body.classList.add('dark');
        }
        const darkToggle = document.getElementById('darkToggle');
        if (darkToggle) {
            const icon = darkToggle.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
            darkToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark');
                const nowDark = document.body.classList.contains('dark');
                localStorage.setItem('theme', nowDark ? 'dark' : 'light');
                const iconNow = darkToggle.querySelector('i');
                if (iconNow) {
                    iconNow.className = nowDark ? 'fas fa-sun' : 'fas fa-moon';
                }
            });
        }
    }
    return { init };
})();
window.Theme = Theme;