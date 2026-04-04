const ProfilePage = (function () {
    let ctasBound = false;
    let profileFormBound = false;

    function currentSessionUser() {
        return typeof Auth.currentUser === "function" ? Auth.currentUser() : null;
    }

    function applyUserContent(u) {
        const nameEl = document.getElementById("profileDisplayName");
        const typeEl = document.getElementById("profileUserType");
        const emailEl = document.getElementById("profileEmail");
        const sinceEl = document.getElementById("profileMemberSince");
        const specRow = document.getElementById("profileSpecialtyRow");
        const specEl = document.getElementById("profileSpecialty");
        const verifyBanner = document.getElementById("profileVerifyBanner");
        const jobsStat = document.getElementById("profileStatJobs");
        const ratingStat = document.getElementById("profileStatRating");

        const fullName = `${u.firstName || ""} ${u.lastName || ""}`.trim();
        if (nameEl) nameEl.textContent = fullName || u.email;
        if (typeEl) {
            typeEl.textContent = u.userType === "worker" ? I18n.getText("worker") : I18n.getText("customer");
        }
        if (emailEl) emailEl.textContent = u.email || "—";

        const created = u.createdAt;
        if (sinceEl) {
            if (created) {
                try {
                    sinceEl.textContent = new Date(created).toLocaleDateString(I18n.currentLang(), {
                        year: "numeric",
                        month: "short"
                    });
                } catch {
                    sinceEl.textContent = "—";
                }
            } else {
                sinceEl.textContent = "—";
            }
        }

        if (specRow && specEl) {
            if (u.userType === "worker" && u.specialty && window.SPECIALTIES_DATA) {
                const spec = window.SPECIALTIES_DATA.find((s) => String(s.id) === String(u.specialty));
                specRow.hidden = false;
                specEl.textContent = spec ? Specialties.getLocalizedName(spec) : "—";
            } else {
                specRow.hidden = true;
            }
        }

        if (verifyBanner) {
            verifyBanner.hidden = u.emailVerified === true;
        }

        const seed = (u.id || u.email || "").toString().length;
        if (jobsStat) jobsStat.textContent = String(12 + (seed % 40));
        if (ratingStat) ratingStat.textContent = (4.6 + (seed % 4) * 0.1).toFixed(1);

        const ef = document.getElementById("profileEditFname");
        if (ef) {
            document.getElementById("profileEditFname").value = u.firstName || "";
            document.getElementById("profileEditLname").value = u.lastName || "";
            const em = document.getElementById("profileEditEmail");
            if (em) em.value = u.email || "";
            document.getElementById("profileEditPhone").value = u.phone?.replace("+20", "") || "";
            document.getElementById("profileEditBirth").value = u.birthDate || "";
            document.getElementById("profileEditAddress").value = u.address || "";
            const pw = document.getElementById("profileEditPassword");
            if (pw) pw.value = "";
        }
    }

    function bindProfileEditForm() {
        if (profileFormBound) return;
        const form = document.getElementById("profileEditForm");
        if (!form) return;
        profileFormBound = true;
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const u = currentSessionUser();
            if (!u) return;
            let users = JSON.parse(localStorage.getItem("craftsmen_users")) || [];
            const idx = users.findIndex((x) => x.email === u.email);
            if (idx === -1) return;
            const phone = document.getElementById("profileEditPhone").value.trim();
            if (!/^01[0-9]{8}$/.test(phone)) {
                Auth.showNotification(I18n.getText("invalid_phone"), "error");
                return;
            }
            users[idx].firstName = document.getElementById("profileEditFname").value.trim();
            users[idx].lastName = document.getElementById("profileEditLname").value.trim();
            users[idx].phone = "+20" + phone;
            users[idx].birthDate = document.getElementById("profileEditBirth").value;
            users[idx].address = document.getElementById("profileEditAddress").value.trim();
            const np = document.getElementById("profileEditPassword").value.trim();
            if (np) {
                if (np.length < 6) {
                    Auth.showNotification(I18n.getText("password_too_short"), "error");
                    return;
                }
                users[idx].password = np;
            }
            localStorage.setItem("craftsmen_users", JSON.stringify(users));
            const sessionUser = { ...users[idx] };
            delete sessionUser.password;
            localStorage.setItem("craftsmen_session", JSON.stringify(sessionUser));
            Auth.updateAuthUI();
            applyUserContent(sessionUser);
            const msg = document.getElementById("profileEditMsg");
            if (msg) {
                msg.innerHTML = '<i class="fas fa-check-circle" aria-hidden="true"></i> ' + I18n.getText("profile_updated");
                msg.style.display = "block";
                setTimeout(() => {
                    msg.style.display = "none";
                }, 3500);
            }
            Auth.showNotification(I18n.getText("profile_updated"));
        });

        const toggle = document.getElementById("profileEditPwToggle");
        toggle?.addEventListener("click", () => {
            const inp = document.getElementById("profileEditPassword");
            if (!inp || !toggle) return;
            if (inp.type === "password") {
                inp.type = "text";
                toggle.classList.replace("fa-eye", "fa-eye-slash");
            } else {
                inp.type = "password";
                toggle.classList.replace("fa-eye-slash", "fa-eye");
            }
        });
    }

    function bindCtas() {
        if (ctasBound) return;
        ctasBound = true;
        document.getElementById("profileDashBtn")?.addEventListener("click", () => {
            const u = currentSessionUser();
            if (!u) return;
            window.location.href = u.userType === "worker" ? "worker-dashboard.html" : "dashboard.html";
        });
        document.getElementById("profileRequestBtn")?.addEventListener("click", () => {
            window.location.href = "request.html";
        });
        document.getElementById("profileSettingsBtn")?.addEventListener("click", () => Auth.showSettingsModal());
    }

    function init() {
        const u = currentSessionUser();
        if (!u) {
            window.location.href = "login.html";
            return;
        }
        applyUserContent(u);
        bindProfileEditForm();
        bindCtas();
    }

    document.addEventListener("i18n:changed", () => {
        if (!document.querySelector(".profile-page")) return;
        const u = currentSessionUser();
        if (u) applyUserContent(u);
    });

    return { init };
})();
window.ProfilePage = ProfilePage;
