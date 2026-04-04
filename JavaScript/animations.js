const Animations = (function () {
    function init() {
        const fadeElements = document.querySelectorAll(
            ".hero-inner, .ps-card, .specialty-card, .specialty-icon, .top-craftsman-card, .review-card, .value-card, .team-leader-card, .team-member-card, .team-avatar, .app-banner-3d, .store-btn"
        );
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: window.innerWidth < 768 ? 0.05 : 0.08, rootMargin: window.innerWidth < 768 ? "0px 0px -10px 0px" : "0px 0px -20px 0px" }
        );

        fadeElements.forEach((el) => observer.observe(el));

        window.addEventListener(
            "scroll",
            () => {
                const header = document.querySelector(".site-header");
                if (header) {
                    header.classList.toggle("is-solid", window.scrollY > 24);
                }
            },
            { passive: true }
        );
    }

    function initDashboard() {
        document.querySelectorAll(".welcome-banner, .dashboard-card").forEach((el, i) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(16px)";
            requestAnimationFrame(() => {
                setTimeout(() => {
                    el.style.transition = "opacity 0.45s ease, transform 0.45s ease";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }, i * 70);
            });
        });
    }

    return { init, initDashboard };
})();
window.Animations = Animations;
