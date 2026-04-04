const App = (function () {
    function initPageDecor() {
        if (!document.getElementById("pageBg")) return;
    }

    function init() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        initPageDecor();

        Specialties.renderSpecialties("featuredGrid", window.SPECIALTIES_DATA.slice(0, 20));
        Specialties.renderTopCraftsmen();
        Specialties.renderReviews();
        Specialties.renderTeam();
        Specialties.renderValueProposition();
        Specialties.renderProblems();

        Animations.init();

        const search = document.getElementById("homeSearchInput");
        if (search) {
            search.addEventListener("input", () => {
                const term = search.value.toLowerCase();
                const filtered = window.SPECIALTIES_DATA.filter((s) =>
                    Specialties.getLocalizedName(s).toLowerCase().includes(term)
                );
                Specialties.renderSpecialties("featuredGrid", filtered.slice(0, 20));
            });
        }

        const viewAllBtn = document.getElementById("viewAllBtn");
        if (viewAllBtn) {
            viewAllBtn.addEventListener("click", () => {
                window.location.href = "all-specialties.html";
            });
        }
    }

    function initAllSpecialties() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        initPageDecor();

        Specialties.renderSpecialties("allSpecialtiesGrid", window.SPECIALTIES_DATA);
        Animations.init();

        const search = document.getElementById("searchInput");
        if (search) {
            search.addEventListener("input", () => Specialties.filterSearch("allSpecialtiesGrid"));
        }
    }

    function initLogin() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        Auth.initLogin();
        initPageDecor();
    }

    function initSignup() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        Auth.initSignup();
        initPageDecor();
    }

    function initRequest() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        Request.init();
        initPageDecor();
    }

    function initDashboard() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        Dashboard.init();
        initPageDecor();
    }

    function initWorkerDashboard() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        Dashboard.initWorker();
        initPageDecor();
    }

    function initProfile() {
        I18n.init();
        Theme.init();
        UI.init();
        Auth.updateAuthUI();
        initPageDecor();
        if (window.ProfilePage) ProfilePage.init();
    }

    return {
        init,
        initAllSpecialties,
        initLogin,
        initSignup,
        initRequest,
        initDashboard,
        initWorkerDashboard,
        initProfile
    };
})();
window.App = App;
