const Specialties = (function () {
    function getLocalizedName(item, field = "name") {
        const lang = I18n.currentLang();
        if (lang === "ar") return item[`${field}_ar`] || item[`${field}_en`];
        if (lang === "fr") return item[`${field}_fr`] || item[`${field}_en`] || item[`${field}_ar`];
        return item[`${field}_en`] || item[`${field}_ar`];
    }

    function getStars(rating) {
        const r = Number(rating) || 0;
        const full = Math.floor(r);
        const half = r % 1 >= 0.5 ? 1 : 0;
        let stars = "";
        for (let i = 0; i < full; i++) stars += "★";
        if (half) stars += "½";
        for (let i = 0; i < 5 - full - half; i++) stars += "☆";
        return stars;
    }

    function renderSpecialties(containerId, specialties) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = specialties
            .map(
                (s) => `
            <div class="specialty-card" data-id="${s.id}" role="button" tabindex="0">
                <div class="specialty-icon-ring" aria-hidden="true"><div class="specialty-icon"><i class="fas ${s.icon}"></i></div></div>
                <div class="specialty-name">${getLocalizedName(s)}</div>
                <div class="rating-stars">${getStars(s.rating)} <span class="review-count">(${s.reviewCount})</span></div>
            </div>
        `
            )
            .join("");

        container.querySelectorAll(".specialty-card").forEach((card) => {
            const go = () => {
                window.location.href = `request.html?specialty=${card.dataset.id}`;
            };
            card.addEventListener("click", go);
            card.addEventListener("keydown", (e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go();
                }
            });
        });
    }

    function renderTopCraftsmen() {
        const container = document.getElementById("topCraftsmenGrid");
        if (!container) return;
        container.innerHTML = window.TOP_CRAFTSMEN.map((c) => {
            const spec = window.SPECIALTIES_DATA.find((s) => s.id == c.specialtyId);
            const specLabel = spec ? getLocalizedName(spec) : "";
            return `<div class="top-craftsman-card">
                <div class="top-craftsman-avatar"><i class="fas fa-user-circle"></i></div>
                <div class="top-craftsman-body">
                    <span class="top-craftsman-name">${getLocalizedName(c)}</span>
                    <span class="top-craftsman-meta">${specLabel}</span>
                    <span class="top-craftsman-rating">${getStars(c.rating)} <strong>${c.rating.toFixed(1)}</strong></span>
                </div>
            </div>`;
        }).join("");
    }

    function renderReviews() {
        const container = document.getElementById("reviewsGrid");
        if (!container) return;
        container.innerHTML = window.CUSTOMER_REVIEWS.map(
            (r) => `
            <div class="review-card">
                <div class="review-stars">${getStars(r.rating)}</div>
                <div class="review-text">"${getLocalizedName(r, "text")}"</div>
                <div class="review-author">— ${getLocalizedName(r, "author")}</div>
            </div>
        `).join("");
    }

    function escapeAttr(str) {
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/"/g, "&quot;")
            .replace(/</g, "&lt;");
    }

    function teamAvatarHtml(m, isLeader) {
        const wrapCls = isLeader ? "team-avatar team-avatar-leader team-avatar-photo-wrap" : "team-avatar team-avatar-photo-wrap";
        const icon = isLeader ? "fa-user-tie" : "fa-user";
        const noImg = !m.photo ? " no-img" : "";
        const alt = escapeAttr(getLocalizedName(m));
        const img = m.photo
            ? `<img class="team-photo" src="${m.photo}" alt="${alt}" loading="lazy" onerror="this.closest('.team-avatar-photo-wrap').classList.add('no-img')">`
            : "";
        return `<div class="${wrapCls}${noImg}">${img}<span class="team-photo-fallback" aria-hidden="true"><i class="fas ${icon}"></i></span></div>`;
    }

    function renderTeam() {
        const wrap = document.getElementById("teamSection");
        if (!wrap) return;

        const leader = window.TEAM_DATA.find((m) => m.isLeader);
        const members = window.TEAM_DATA.filter((m) => !m.isLeader);

        const leaderHtml = leader
            ? `<div class="team-leader-card">
                <div class="team-leader-glow"></div>
                ${teamAvatarHtml(leader, true)}
                <h3 class="team-leader-name">${getLocalizedName(leader)}</h3>
                <p class="team-leader-role">${getLocalizedName(leader, "role")}</p>
                <p class="team-leader-specialty" style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.35rem;">${leader.specialty_en || getLocalizedName(leader, "role")}</p>
                <p class="team-leader-rating" style="margin-top: 0.5rem; color: #f59e0b; font-weight: 700; letter-spacing: 1px;">${getStars(leader.rating)} <span style="font-weight: 900; color: var(--primary);">${leader.rating.toFixed(1)}</span></p>
            </div>`
            : "";

        const membersHtml = members
            .map(
                (m) => `
            <div class="team-member-card">
                ${teamAvatarHtml(m, false)}
                <h4>${getLocalizedName(m)}</h4>
                <p style="font-size: 0.8rem; color: var(--text-muted);">${getLocalizedName(m, "role")}</p>
                <p style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem;">${m.specialty_en || getLocalizedName(m, "role")}</p>
                <p style="margin-top: 0.35rem; color: #f59e0b; font-size: 0.82rem; letter-spacing: 1px; font-weight: 700;">${getStars(m.rating)} <span style="font-weight: 900; color: var(--primary); font-size: 0.85rem;">${m.rating.toFixed(1)}</span></p>
            </div>
        `
            )
            .join("");

        wrap.innerHTML = `
            <div class="team-layout">
                <div class="team-leader-wrap">${leaderHtml}</div>
                <div class="team-members-row">${membersHtml}</div>
            </div>
        `;
    }

    function renderValueProposition() {
        const container = document.getElementById("valueGrid");
        if (!container) return;
        container.innerHTML = window.VALUE_DATA.map(
            (v) => `
            <div class="value-card">
                <i class="fas ${v.icon}"></i>
                <h4>${getLocalizedName(v, "title")}</h4>
                <p>${getLocalizedName(v, "desc")}</p>
            </div>
        `).join("");
    }

    function renderProblems() {
        const customerContainer = document.getElementById("customerProblemsList");
        const workerContainer = document.getElementById("workerProblemsList");
        const solutionsContainer = document.getElementById("platformSolutionsList");
        const lang = I18n.currentLang();
        if (customerContainer) {
            customerContainer.innerHTML = window.CUSTOMER_PROBLEMS[lang].map((p) => `<li>${p}</li>`).join("");
        }
        if (workerContainer) {
            workerContainer.innerHTML = window.WORKER_PROBLEMS[lang].map((p) => `<li>${p}</li>`).join("");
        }
        if (solutionsContainer) {
            solutionsContainer.innerHTML = window.PLATFORM_SOLUTIONS[lang].map((p) => `<li>${p}</li>`).join("");
        }
    }

    function filterSearch(containerId) {
        const term = document.getElementById("searchInput")?.value.toLowerCase() || "";
        const filtered = window.SPECIALTIES_DATA.filter((s) => getLocalizedName(s).toLowerCase().includes(term));
        renderSpecialties(containerId, filtered);
    }

    function refreshUI() {
        renderTopCraftsmen();
        renderReviews();
        renderTeam();
        renderValueProposition();
        renderProblems();
        const featuredGrid = document.getElementById("featuredGrid");
        if (featuredGrid) {
            const term = (document.getElementById("homeSearchInput")?.value || "").toLowerCase();
            const list = term
                ? window.SPECIALTIES_DATA.filter((s) => getLocalizedName(s).toLowerCase().includes(term)).slice(0, 20)
                : window.SPECIALTIES_DATA.slice(0, 20);
            renderSpecialties("featuredGrid", list);
        }
        const allGrid = document.getElementById("allSpecialtiesGrid");
        if (allGrid) {
            renderSpecialties("allSpecialtiesGrid", window.SPECIALTIES_DATA);
            filterSearch("allSpecialtiesGrid");
        }
    }

    return {
        renderSpecialties,
        renderTopCraftsmen,
        renderReviews,
        renderTeam,
        renderValueProposition,
        renderProblems,
        filterSearch,
        refreshUI,
        getLocalizedName,
        getStars
    };
})();
window.Specialties = Specialties;
