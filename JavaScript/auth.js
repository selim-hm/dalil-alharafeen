const Auth = (function () {
    let currentUser = JSON.parse(localStorage.getItem("craftsmen_session"));
    let users = JSON.parse(localStorage.getItem("craftsmen_users")) || [];
    let documentClickBound = false;

    function loadUsers() {
        users = JSON.parse(localStorage.getItem("craftsmen_users")) || [];
    }

    function showNotification(message, type = "success") {
        const toast = document.createElement("div");
        toast.setAttribute("role", "status");
        toast.setAttribute("aria-live", "polite");
        toast.setAttribute("aria-atomic", "true");
        toast.className = `toast ${type === "error" ? "error" : ""}`;
        toast.innerHTML = `<i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-triangle"}"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 3200);
    }

    function updateAuthUI() {
        loadUsers();
        currentUser = JSON.parse(localStorage.getItem("craftsmen_session"));
        const authSection = document.getElementById("authSection");
        if (!authSection) return;

        if (currentUser) {
            const userTypeText = currentUser.userType === "worker" ? I18n.getText("worker") : I18n.getText("customer");
            const dashHref = currentUser.userType === "worker" ? "worker-dashboard.html" : "dashboard.html";
            const dashLabel = currentUser.userType === "worker" ? I18n.getText("worker_dashboard") : I18n.getText("dashboard");
            authSection.innerHTML = `
                <div class="profile-dropdown">
                    <button type="button" class="profile-icon" id="profileIcon" aria-expanded="false" aria-haspopup="true"><i class="fas fa-user-circle"></i></button>
                    <div id="profileDropdown" class="dropdown-content profile-menu" role="menu">
                        <div class="profile-menu-static"><i class="fas fa-envelope"></i> ${currentUser.email}</div>
                        <div class="profile-menu-static"><i class="fas fa-user"></i> ${currentUser.firstName} ${currentUser.lastName}</div>
                        <div class="profile-menu-static"><i class="fas fa-tag"></i> ${userTypeText}</div>
                        <div role="menuitem" data-nav="profile.html"><i class="fas fa-id-card"></i> ${I18n.getText("nav_profile")}</div>
                        <div role="menuitem" data-nav="${dashHref}"><i class="fas fa-tachometer-alt"></i> ${dashLabel}</div>
                        <div role="menuitem" data-action="settings"><i class="fas fa-cog"></i> ${I18n.getText("settings")}</div>
                        <div role="menuitem" id="logoutBtn" class="profile-logout"><i class="fas fa-sign-out-alt"></i> ${I18n.getText("logout")}</div>
                    </div>
                </div>`;

            document.getElementById("profileIcon")?.addEventListener("click", (e) => {
                e.stopPropagation();
                const d = document.getElementById("profileDropdown");
                d?.classList.toggle("show-dropdown");
            });

            authSection.querySelectorAll("[data-nav]").forEach((el) => {
                el.addEventListener("click", () => {
                    window.location.href = el.getAttribute("data-nav");
                });
            });
            authSection.querySelector("[data-action='settings']")?.addEventListener("click", () => showSettingsModal());
            document.getElementById("logoutBtn")?.addEventListener("click", logout);
        } else {
            authSection.innerHTML = `
                <div class="auth-nav-pair">
                    <a href="login.html" class="btn-nav-login">${I18n.getText("login_nav")}</a>
                    <a href="signup.html" class="btn-nav-signup">${I18n.getText("signup_nav")}</a>
                </div>`;
        }

        if (!documentClickBound) {
            documentClickBound = true;
            window.addEventListener("click", () => {
                document.getElementById("profileDropdown")?.classList.remove("show-dropdown");
            });
        }
    }

    function logout() {
        currentUser = null;
        localStorage.removeItem("craftsmen_session");
        updateAuthUI();
        window.location.href = "index.html";
    }

    function initLogin() {
        loadUsers();
        const form = document.getElementById("loginForm");
        if (!form) return;
        const togglePassword = document.getElementById("toggleLoginPassword");
        if (togglePassword) {
            togglePassword.addEventListener("click", () => {
                const input = document.getElementById("loginPassword");
                if (input.type === "password") {
                    input.type = "text";
                    togglePassword.classList.replace("fa-eye", "fa-eye-slash");
                } else {
                    input.type = "password";
                    togglePassword.classList.replace("fa-eye-slash", "fa-eye");
                }
            });
        }
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            loadUsers();
            const identifier = document.getElementById("loginIdentifier").value.trim();
            const password = document.getElementById("loginPassword").value;
            const user = users.find((u) => (u.email === identifier || u.phone === identifier) && u.password === password);
            if (!user) {
                showNotification(I18n.getText("user_not_found"), "error");
                return;
            }
            currentUser = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
                birthDate: user.birthDate,
                gender: user.gender,
                userType: user.userType,
                specialty: user.specialty,
                city: user.city,
                district: user.district,
                address: user.address,
                emailVerified: user.emailVerified === true,
                createdAt: user.createdAt
            };
            localStorage.setItem("craftsmen_session", JSON.stringify(currentUser));
            showNotification(I18n.getText("login_success"));
            setTimeout(() => {
                window.location.href = "profile.html";
            }, 800);
        });
    }

    function initSignup() {
        loadUsers();
        const form = document.getElementById("signupForm");
        if (!form) return;

        const userTypeBtns = document.querySelectorAll(".user-type-btn");
        const userTypeInput = document.getElementById("userType");
        const workerGroup = document.getElementById("workerSpecialtyGroup");

        const setUserType = (type) => {
            userTypeBtns.forEach((b) => {
                b.classList.toggle("active", b.getAttribute("data-type") === type);
            });
            if (userTypeInput) userTypeInput.value = type;
            if (workerGroup) workerGroup.style.display = type === "worker" ? "block" : "none";
        };

        userTypeBtns.forEach((btn) => {
            btn.addEventListener("click", () => {
                const type = btn.getAttribute("data-type") || "client";
                setUserType(type);
            });
        });

        setUserType(userTypeInput?.value || "client");

        function fillSpecialties() {
            const specialtySelect = document.getElementById("signupSpecialty");
            if (!specialtySelect || !window.SPECIALTIES_DATA) return;
            const fn = Specialties.getLocalizedName;
            specialtySelect.innerHTML =
                '<option value="">' + I18n.getText("select_specialty") + "</option>" + window.SPECIALTIES_DATA.map((s) => `<option value="${s.id}">${fn(s)}</option>`).join("");
        }
        fillSpecialties();

        const govSelect = document.getElementById("signupGovernorate");
        const districtSelect = document.getElementById("signupDistrict");
        if (govSelect && window.GOVERNORATES_DATA) {
            govSelect.innerHTML =
                '<option value="">' + I18n.getText("select_governorate") + "</option>" +
                Object.keys(window.GOVERNORATES_DATA)
                    .map((k) => `<option value="${k}">${I18n.getGovernorateLabel(k)}</option>`)
                    .join("");
            govSelect.addEventListener("change", function () {
                const gov = this.value;
                if (gov && window.GOVERNORATES_DATA[gov]) {
                    districtSelect.disabled = false;
                    districtSelect.innerHTML =
                        '<option value="">' + I18n.getText("select_district") + "</option>" +
                        window.GOVERNORATES_DATA[gov].cities.map((city) => `<option value="${city}">${city}</option>`).join("");
                } else {
                    districtSelect.disabled = true;
                    districtSelect.innerHTML = '<option value="">' + I18n.getText("select_governorate_first") + "</option>";
                }
            });
        }

        document.addEventListener("i18n:changed", () => {
            const g = govSelect?.value;
            const d = districtSelect?.value;
            if (govSelect && window.GOVERNORATES_DATA) {
                govSelect.innerHTML =
                    '<option value="">' + I18n.getText("select_governorate") + "</option>" +
                    Object.keys(window.GOVERNORATES_DATA)
                        .map((k) => `<option value="${k}">${I18n.getGovernorateLabel(k)}</option>`)
                        .join("");
                if (g) {
                    govSelect.value = g;
                    govSelect.dispatchEvent(new Event("change"));
                    if (d && districtSelect) districtSelect.value = d;
                }
            }
            fillSpecialties();
        });

        const toggleSignup = document.getElementById("toggleSignupPassword");
        const toggleConfirm = document.getElementById("toggleConfirmPassword");
        if (toggleSignup) {
            toggleSignup.addEventListener("click", () => {
                const inp = document.getElementById("signupPassword");
                if (inp.type === "password") {
                    inp.type = "text";
                    toggleSignup.classList.replace("fa-eye", "fa-eye-slash");
                } else {
                    inp.type = "password";
                    toggleSignup.classList.replace("fa-eye-slash", "fa-eye");
                }
            });
        }
        if (toggleConfirm) {
            toggleConfirm.addEventListener("click", () => {
                const inp = document.getElementById("signupConfirmPassword");
                if (inp.type === "password") {
                    inp.type = "text";
                    toggleConfirm.classList.replace("fa-eye", "fa-eye-slash");
                } else {
                    inp.type = "password";
                    toggleConfirm.classList.replace("fa-eye-slash", "fa-eye");
                }
            });
        }

        const passwordInput = document.getElementById("signupPassword");
        const confirmInput = document.getElementById("signupConfirmPassword");
        const matchMsg = document.getElementById("passwordMatchMsg");
        if (passwordInput && confirmInput && matchMsg) {
            const checkMatch = () => {
                if (passwordInput.value && confirmInput.value) {
                    if (passwordInput.value === confirmInput.value) {
                        matchMsg.innerHTML = '<span class="match-yes">✓ ' + I18n.getText("passwords_match") + "</span>";
                    } else {
                        matchMsg.innerHTML = '<span class="match-no">✗ ' + I18n.getText("passwords_do_not_match") + "</span>";
                    }
                } else {
                    matchMsg.innerHTML = "";
                }
            };
            passwordInput.addEventListener("input", checkMatch);
            confirmInput.addEventListener("input", checkMatch);
        }

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            loadUsers();
            const fname = document.getElementById("signupFname").value.trim();
            const lname = document.getElementById("signupLname").value.trim();
            const email = document.getElementById("signupEmail").value.trim();
            const emailConfirm = document.getElementById("signupEmailConfirm")?.value.trim() || "";
            const phone = document.getElementById("signupPhone").value.trim();
            const birthDate = document.getElementById("signupBirthDate").value;
            const gender = document.querySelector('input[name="gender"]:checked')?.value;
            const userType = userTypeInput.value;
            const specialty = userType === "worker" ? document.getElementById("signupSpecialty").value : null;
            const city = document.getElementById("signupGovernorate").value;
            const district = document.getElementById("signupDistrict").value;
            const address = document.getElementById("signupAddress").value.trim();
            const password = document.getElementById("signupPassword").value;
            const confirm = document.getElementById("signupConfirmPassword").value;
            const acceptTerms = document.getElementById("acceptTerms").checked;

            if (!acceptTerms) {
                showNotification(I18n.getText("terms_required"), "error");
                return;
            }
            if (password !== confirm) {
                showNotification(I18n.getText("password_mismatch"), "error");
                return;
            }
            if (password.length < 6) {
                showNotification(I18n.getText("password_too_short"), "error");
                return;
            }
            if (!/^01[0-9]{8}$/.test(phone)) {
                showNotification(I18n.getText("invalid_phone"), "error");
                return;
            }
            if (!/^[^\s@]+@([^\s@]+\.)+[^\s@]+$/.test(email)) {
                showNotification(I18n.getText("invalid_email"), "error");
                return;
            }
            if (email !== emailConfirm) {
                showNotification(I18n.getText("email_confirm_mismatch"), "error");
                return;
            }
            if (userType === "worker" && !specialty) {
                showNotification(I18n.getText("select_specialty_required"), "error");
                return;
            }
            if (!city || !district) {
                showNotification(I18n.getText("fill_all_fields"), "error");
                return;
            }
            if (users.find((u) => u.email === email)) {
                showNotification(I18n.getText("email_exists"), "error");
                return;
            }
            if (users.find((u) => u.phone === "+20" + phone)) {
                showNotification(I18n.getText("phone_exists"), "error");
                return;
            }

            users.push({
                id: Date.now(),
                firstName: fname,
                lastName: lname,
                email,
                phone: "+20" + phone,
                birthDate,
                gender,
                userType,
                specialty,
                city,
                district,
                address,
                password,
                createdAt: new Date().toISOString(),
                emailVerified: false
            });
            localStorage.setItem("craftsmen_users", JSON.stringify(users));
            showNotification(I18n.getText("account_created"));
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1200);
        });
    }

    function showSettingsModal() {
        if (!currentUser) return;
        let modal = document.getElementById("settingsModal");
        if (!modal) {
            const modalHTML = `<div id="settingsModal" class="modal" style="display: flex;"><div class="modal-content"><span class="close-modal" onclick="Auth.closeSettingsModal()">&times;</span><h3>${I18n.getText("settings")}</h3><div class="form-group"><label>${I18n.getText("first_name")}</label><input type="text" id="settingsFname"></div><div class="form-group"><label>${I18n.getText("last_name")}</label><input type="text" id="settingsLname"></div><div class="form-group"><label>${I18n.getText("email")}</label><input type="email" id="settingsEmail" disabled></div><div class="form-group"><label>${I18n.getText("phone")}</label><div class="phone-input-group"><span class="phone-prefix">+20</span><input type="tel" id="settingsPhone"></div></div><div class="form-group"><label>${I18n.getText("birth_date")}</label><input type="date" id="settingsBirthDate"></div><div class="form-group"><label>${I18n.getText("address")}</label><input type="text" id="settingsAddress"></div><hr><h4>${I18n.getText("change_password")}</h4><div class="form-group"><label>${I18n.getText("current_password")}</label><input type="password" id="settingsOldPassword"></div><div class="form-group"><label>${I18n.getText("new_password")}</label><input type="password" id="settingsNewPassword"></div><div class="form-group"><label>${I18n.getText("confirm_password")}</label><input type="password" id="settingsConfirmPassword"></div><div style="display: flex; gap: 12px; flex-wrap: wrap;"><button type="button" class="btn btn-primary" onclick="Auth.updateUserProfile()">${I18n.getText("save_changes")}</button><button type="button" class="btn btn-outline btn-danger-outline" onclick="Auth.deleteAccount()">${I18n.getText("delete_account")}</button></div></div></div>`;
            document.body.insertAdjacentHTML("beforeend", modalHTML);
            modal = document.getElementById("settingsModal");
        }
        document.getElementById("settingsFname").value = currentUser.firstName;
        document.getElementById("settingsLname").value = currentUser.lastName;
        document.getElementById("settingsEmail").value = currentUser.email;
        document.getElementById("settingsPhone").value = currentUser.phone?.replace("+20", "") || "";
        document.getElementById("settingsBirthDate").value = currentUser.birthDate || "";
        document.getElementById("settingsAddress").value = currentUser.address || "";
        modal.style.display = "flex";
    }

    function closeSettingsModal() {
        const m = document.getElementById("settingsModal");
        if (m) m.style.display = "none";
    }

    function updateUserProfile() {
        loadUsers();
        const userIndex = users.findIndex((u) => u.email === currentUser.email);
        if (userIndex === -1) return;
        const oldPass = document.getElementById("settingsOldPassword").value;
        const newPass = document.getElementById("settingsNewPassword").value;
        const confirmPass = document.getElementById("settingsConfirmPassword").value;
        if (newPass) {
            if (users[userIndex].password !== oldPass) {
                showNotification(I18n.getText("old_password_incorrect"), "error");
                return;
            }
            if (newPass !== confirmPass) {
                showNotification(I18n.getText("password_mismatch"), "error");
                return;
            }
            users[userIndex].password = newPass;
        }
        users[userIndex].firstName = document.getElementById("settingsFname").value;
        users[userIndex].lastName = document.getElementById("settingsLname").value;
        users[userIndex].phone = "+20" + document.getElementById("settingsPhone").value;
        users[userIndex].birthDate = document.getElementById("settingsBirthDate").value;
        users[userIndex].address = document.getElementById("settingsAddress").value;
        localStorage.setItem("craftsmen_users", JSON.stringify(users));
        const u = { ...users[userIndex] };
        delete u.password;
        if (u.emailVerified === undefined) u.emailVerified = false;
        if (!u.createdAt) u.createdAt = new Date().toISOString();
        currentUser = u;
        localStorage.setItem("craftsmen_session", JSON.stringify(currentUser));
        showNotification(I18n.getText("profile_updated"));
        closeSettingsModal();
        updateAuthUI();
    }

    function deleteAccount() {
        if (confirm(I18n.getText("confirm_delete"))) {
            loadUsers();
            users = users.filter((u) => u.email !== currentUser.email);
            localStorage.setItem("craftsmen_users", JSON.stringify(users));
            logout();
        }
    }

    function currentUserData() {
        return JSON.parse(localStorage.getItem("craftsmen_session"));
    }

    return {
        initLogin,
        initSignup,
        updateAuthUI,
        logout,
        showSettingsModal,
        closeSettingsModal,
        updateUserProfile,
        deleteAccount,
        currentUser: currentUserData,
        showNotification
    };
})();
window.Auth = Auth;
window.showSettingsModal = () => Auth.showSettingsModal();
window.closeSettingsModal = () => Auth.closeSettingsModal();
window.updateUserProfile = () => Auth.updateUserProfile();
window.deleteAccount = () => Auth.deleteAccount();
