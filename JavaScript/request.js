const Request = (function () {
    let orders = JSON.parse(localStorage.getItem("craftsmen_orders")) || [];

    function fillSpecialtySelect(specSelect, preselected) {
        if (!specSelect || !window.SPECIALTIES_DATA) return;
        const fn = Specialties.getLocalizedName;
        specSelect.innerHTML =
            '<option value="">' +
            I18n.getText("select_specialty") +
            "</option>" +
            window.SPECIALTIES_DATA.map((s) => `<option value="${s.id}">${fn(s)}</option>`).join("");
        if (preselected) specSelect.value = preselected;
    }

    function fillGovernorateSelect(govSelect) {
        if (!govSelect || !window.GOVERNORATES_DATA) return;
        const keys = Object.keys(window.GOVERNORATES_DATA);
        govSelect.innerHTML =
            '<option value="">' +
            I18n.getText("select_governorate") +
            "</option>" +
            keys.map((k) => `<option value="${k}">${I18n.getGovernorateLabel(k)}</option>`).join("");
    }

    function init() {
        const currentUser = typeof Auth.currentUser === "function" ? Auth.currentUser() : null;
        const urlParams = new URLSearchParams(window.location.search);
        const preselectedSpecialty = urlParams.get("specialty");

        const specSelect = document.getElementById("specialtySelect");
        fillSpecialtySelect(specSelect, preselectedSpecialty);

        const govSelect = document.getElementById("governorateSelect");
        fillGovernorateSelect(govSelect);
        if (govSelect) {
            govSelect.addEventListener("change", function () {
                const gov = this.value;
                const districtSelect = document.getElementById("districtSelect");
                if (gov && window.GOVERNORATES_DATA[gov]) {
                    districtSelect.disabled = false;
                    districtSelect.innerHTML =
                        '<option value="">' +
                        I18n.getText("select_district") +
                        "</option>" +
                        window.GOVERNORATES_DATA[gov].cities.map((city) => `<option value="${city}">${city}</option>`).join("");
                } else {
                    districtSelect.disabled = true;
                    districtSelect.innerHTML = '<option value="">' + I18n.getText("select_governorate_first") + "</option>";
                }
            });
        }

        const problemDesc = document.getElementById("problemDesc");
        if (problemDesc) problemDesc.placeholder = I18n.getText("problem_placeholder");

        if (currentUser) {
            const fn = document.getElementById("fullName");
            if (fn) fn.value = `${currentUser.firstName} ${currentUser.lastName}`;
            const em = document.getElementById("emailOrder");
            if (em) em.value = currentUser.email;
            const ph = document.getElementById("phoneOrder");
            if (ph) ph.value = currentUser.phone?.replace("+20", "") || "";
            const ad = document.getElementById("address");
            if (ad && currentUser.address) ad.value = currentUser.address;
        }

        const imagesInput = document.getElementById("images");
        if (imagesInput) {
            imagesInput.addEventListener("change", function () {
                const preview = document.getElementById("imagePreview");
                preview.innerHTML = "";
                Array.from(this.files).forEach((file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement("img");
                        img.src = e.target.result;
                        preview.appendChild(img);
                    };
                    reader.readAsDataURL(file);
                });
            });
        }

        document.getElementById("getLocationBtn")?.addEventListener("click", () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    () => Auth.showNotification(I18n.getText("location_determined")),
                    () => Auth.showNotification(I18n.getText("location_failed"), "error")
                );
            } else {
                Auth.showNotification(I18n.getText("location_not_supported"), "error");
            }
        });

        let currentStep = 1;
        const totalSteps = 4;
        const steps = document.querySelectorAll(".form-step");
        const prevBtn = document.getElementById("prevBtn");
        const nextBtn = document.getElementById("nextBtn");
        const submitBtn = document.getElementById("submitBtn");

        function updateStepUI() {
            steps.forEach((step) => {
                step.classList.remove("form-step-active");
                step.style.display = "none";
            });
            const active = document.querySelector(`.form-step[data-step="${currentStep}"]`);
            if (active) {
                active.style.display = "block";
                active.classList.add("form-step-active");
                const firstInput = active.querySelector("input, textarea, select");
                if (firstInput) firstInput.focus({ preventScroll: true });
            }
            document.querySelectorAll(".step-item").forEach((item, i) => {
                const stepNum = i + 1;
                item.classList.remove("active", "completed");
                if (stepNum < currentStep) item.classList.add("completed");
                else if (stepNum === currentStep) item.classList.add("active");
            });
            if (prevBtn) prevBtn.style.display = currentStep === 1 ? "none" : "inline-flex";
            if (nextBtn && submitBtn) {
                if (currentStep === totalSteps) {
                    nextBtn.style.display = "none";
                    submitBtn.style.display = "inline-flex";
                } else {
                    nextBtn.style.display = "inline-flex";
                    submitBtn.style.display = "none";
                }
            }
        }

        function validateStep(step) {
            const stepElement = document.querySelector(`.form-step[data-step="${step}"]`);
            if (!stepElement) return false;
            const inputs = Array.from(stepElement.querySelectorAll("input[required], select[required], textarea[required]"));
            let valid = true;
            let firstInvalid = null;
            inputs.forEach((input) => {
                const value = String(input.value || "").trim();
                if (!value) {
                    valid = false;
                    input.classList.add("input-error");
                    if (!firstInvalid) firstInvalid = input;
                    setTimeout(() => input.classList.remove("input-error"), 2000);
                }
            });
            if (!valid && firstInvalid) {
                firstInvalid.scrollIntoView({ behavior: "smooth", block: "center" });
                firstInvalid.focus({ preventScroll: true });
            }
            return valid;
        }

        nextBtn?.addEventListener("click", () => {
            if (!validateStep(currentStep)) {
                Auth.showNotification(I18n.getText("fill_all_fields"), "error");
                return;
            }
            if (currentStep < totalSteps) {
                currentStep++;
                updateStepUI();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });

        prevBtn?.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                updateStepUI();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });

        document.getElementById("orderForm")?.addEventListener("submit", (e) => {
            e.preventDefault();
            orders = JSON.parse(localStorage.getItem("craftsmen_orders")) || [];
            const name = document.getElementById("fullName").value.trim();
            const email = document.getElementById("emailOrder").value.trim();
            const phone = document.getElementById("phoneOrder").value.trim();
            const specialtyId = specSelect?.value;
            const gov = govSelect?.value;
            const district = document.getElementById("districtSelect")?.value;
            const address = document.getElementById("address").value.trim();
            const problemDescVal = document.getElementById("problemDesc").value.trim();
            const acceptTerms = document.getElementById("requestTerms").checked;

            if (!name || !email || !phone || !specialtyId || !gov || !district || !address || !problemDescVal) {
                Auth.showNotification(I18n.getText("fill_all_fields"), "error");
                return;
            }
            if (!acceptTerms) {
                Auth.showNotification(I18n.getText("terms_required"), "error");
                return;
            }
            if (!/^01[0-9]{8}$/.test(phone)) {
                Auth.showNotification(I18n.getText("invalid_phone"), "error");
                return;
            }

            orders.push({
                id: Date.now(),
                name,
                email,
                phone: "+20" + phone,
                specialty: parseInt(specialtyId, 10),
                governorate: gov,
                district,
                address,
                problemDesc: problemDescVal,
                date: new Date().toISOString(),
                status: "pending"
            });
            localStorage.setItem("craftsmen_orders", JSON.stringify(orders));
            Auth.showNotification(I18n.getText("request_submitted"));
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1200);
        });

        updateStepUI();

        document.addEventListener("i18n:changed", () => {
            const specVal = specSelect?.value;
            const gv = govSelect?.value;
            const distSel = document.getElementById("districtSelect");
            const distVal = distSel?.value;
            fillSpecialtySelect(specSelect, specVal);
            fillGovernorateSelect(govSelect);
            if (gv && govSelect && window.GOVERNORATES_DATA[gv] && distSel) {
                govSelect.value = gv;
                distSel.disabled = false;
                distSel.innerHTML =
                    '<option value="">' +
                    I18n.getText("select_district") +
                    "</option>" +
                    window.GOVERNORATES_DATA[gv].cities.map((city) => `<option value="${city}">${city}</option>`).join("");
                if (distVal && Array.from(distSel.options).some((o) => o.value === distVal)) distSel.value = distVal;
            }
            if (problemDesc) problemDesc.placeholder = I18n.getText("problem_placeholder");
        });
    }

    return { init };
})();
window.Request = Request;
