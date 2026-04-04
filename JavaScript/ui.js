const UI = (function () {
    function initContentProtection() {
        function allowedTarget(el) {
            if (!el || !el.closest) return false;
            return !!el.closest(
                'input, textarea, select, button, option, label, a, .allow-copy, [contenteditable="true"]'
            );
        }
        document.addEventListener(
            "copy",
            (e) => {
                if (!allowedTarget(e.target)) e.preventDefault();
            },
            true
        );
        document.addEventListener(
            "cut",
            (e) => {
                if (!allowedTarget(e.target)) e.preventDefault();
            },
            true
        );
        document.addEventListener(
            "contextmenu",
            (e) => {
                if (!allowedTarget(e.target)) e.preventDefault();
            },
            true
        );
        document.addEventListener(
            "dragstart",
            (e) => {
                if (e.target.tagName === "IMG" && !allowedTarget(e.target)) e.preventDefault();
            },
            true
        );
    }

    function initFloatingMenu() {
        const btn = document.getElementById("floatingMenuBtn");
        const options = document.getElementById("floatingOptions");
        if (btn && options) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                options.classList.toggle("show");
                btn.classList.toggle("open");
            });
            document.addEventListener("click", (e) => {
                if (!btn.contains(e.target) && !options.contains(e.target)) {
                    options.classList.remove("show");
                    btn.classList.remove("open");
                }
            });
        }
    }

    function initChat() {
        const chatFloat = document.getElementById("chatFloatBtn");
        const chatWindow = document.getElementById("chatWindow");
        const closeChat = document.getElementById("closeChatBtn");
        const chatMessages = document.getElementById("chatMessages");
        const chatInputArea = document.getElementById("chatInputArea");
        const chatInput = document.getElementById("chatInput");
        const sendChatBtn = document.getElementById("sendChatBtn");

        if (!chatFloat || !chatWindow) return;

        function faqReplyCreate() {
            return I18n.getText("help_answer_create");
        }
        function faqReplyRequest() {
            return I18n.getText("help_answer_request");
        }

        function showFaqMenu() {
            if (!chatMessages) return;
            chatMessages.innerHTML = "";
            const intro = document.createElement("div");
            intro.className = "message bot-msg";
            intro.textContent = I18n.getText("choose_from_menu");
            chatMessages.appendChild(intro);

            const mkBtn = (labelKey, onClick) => {
                const b = document.createElement("button");
                b.type = "button";
                b.className = "chat-menu-btn";
                b.setAttribute("data-i18n", labelKey);
                b.textContent = I18n.getText(labelKey);
                b.addEventListener("click", onClick);
                chatMessages.appendChild(b);
            };

            mkBtn("help_faq_account", () => {
                chatMessages.innerHTML = "";
                const r = document.createElement("div");
                r.className = "message bot-msg";
                r.textContent = faqReplyCreate();
                chatMessages.appendChild(r);
                const back = document.createElement("button");
                back.type = "button";
                back.className = "chat-menu-btn";
                back.textContent = I18n.getText("back_to_menu");
                back.addEventListener("click", showFaqMenu);
                chatMessages.appendChild(back);
            });

            mkBtn("help_faq_request", () => {
                chatMessages.innerHTML = "";
                const r = document.createElement("div");
                r.className = "message bot-msg";
                r.textContent = faqReplyRequest();
                chatMessages.appendChild(r);
                const back = document.createElement("button");
                back.type = "button";
                back.className = "chat-menu-btn";
                back.textContent = I18n.getText("back_to_menu");
                back.addEventListener("click", showFaqMenu);
                chatMessages.appendChild(back);
            });

            mkBtn("help_other", () => {
                chatMessages.innerHTML = "";
                const r = document.createElement("div");
                r.className = "message bot-msg";
                r.textContent = I18n.getText("other_issue_prompt");
                chatMessages.appendChild(r);
                if (chatInputArea) chatInputArea.style.display = "flex";
            });

            if (chatInputArea) chatInputArea.style.display = "none";
        }

        chatFloat.addEventListener("click", () => {
            chatWindow.style.display = "flex";
            showFaqMenu();
        });

        closeChat?.addEventListener("click", () => {
            chatWindow.style.display = "none";
        });

        sendChatBtn?.addEventListener("click", () => {
            const msg = chatInput?.value.trim();
            if (!msg) return;
            const userDiv = document.createElement("div");
            userDiv.className = "message user-msg";
            userDiv.textContent = msg;
            chatMessages.appendChild(userDiv);
            const replyDiv = document.createElement("div");
            replyDiv.className = "message bot-msg";
            replyDiv.textContent = I18n.getText("response_24h");
            chatMessages.appendChild(replyDiv);
            chatInput.value = "";
            if (chatInputArea) chatInputArea.style.display = "none";
            const backBtn = document.createElement("button");
            backBtn.type = "button";
            backBtn.className = "chat-menu-btn";
            backBtn.textContent = I18n.getText("back_to_menu");
            backBtn.addEventListener("click", showFaqMenu);
            chatMessages.appendChild(backBtn);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
    }

    function initHelp() {
        const helpFloat = document.getElementById("helpFloatBtn");
        const helpWindow = document.getElementById("helpWindow");
        const closeHelp = document.getElementById("closeHelpBtn");
        const helpMenu = document.getElementById("helpMenu");
        const helpMessageArea = document.getElementById("helpMessageArea");
        const helpConfirmation = document.getElementById("helpConfirmation");
        const sendHelpMsgBtn = document.getElementById("sendHelpMsgBtn");
        const backToHelpMenuBtn = document.getElementById("backToHelpMenuBtn");
        const helpMessageInput = document.getElementById("helpMessageInput");

        if (!helpFloat || !helpWindow) return;

        function applyHelpLabels() {
            document.querySelectorAll("#helpMenu [data-i18n]").forEach((el) => {
                const k = el.getAttribute("data-i18n");
                if (k) el.textContent = I18n.getText(k);
            });
            if (helpMessageInput) helpMessageInput.placeholder = I18n.getText("help_issue_placeholder");
            if (sendHelpMsgBtn) sendHelpMsgBtn.textContent = I18n.getText("help_send");
            if (backToHelpMenuBtn) backToHelpMenuBtn.textContent = I18n.getText("help_back");
            document.querySelectorAll("#helpConfirmation [data-i18n]").forEach((el) => {
                const k = el.getAttribute("data-i18n");
                if (k) el.textContent = I18n.getText(k);
            });
            const okBtn = document.getElementById("closeHelpConfirmBtn");
            if (okBtn) okBtn.textContent = I18n.getText("help_ok");
        }

        function showHelpMenu() {
            helpMenu.style.display = "flex";
            helpMessageArea.style.display = "none";
            helpConfirmation.style.display = "none";
            applyHelpLabels();
        }

        helpFloat.addEventListener("click", () => {
            helpWindow.style.display = "flex";
            showHelpMenu();
        });

        closeHelp?.addEventListener("click", () => {
            helpWindow.style.display = "none";
        });

        document.querySelectorAll(".help-menu-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                const action = btn.getAttribute("data-action");
                if (action === "other") {
                    helpMenu.style.display = "none";
                    helpMessageArea.style.display = "block";
                    applyHelpLabels();
                    return;
                }
                if (action === "create") {
                    Auth.showNotification(I18n.getText("help_answer_create"));
                    return;
                }
                if (action === "request") {
                    Auth.showNotification(I18n.getText("help_answer_request"));
                    return;
                }
                if (action === "whatsapp") {
                    window.open("https://wa.me/201272076840", "_blank", "noopener,noreferrer");
                }
            });
        });

        sendHelpMsgBtn?.addEventListener("click", () => {
            const msg = helpMessageInput?.value.trim();
            if (!msg) return;
            helpMessageArea.style.display = "none";
            helpConfirmation.style.display = "block";
            helpMessageInput.value = "";
            applyHelpLabels();
        });

        backToHelpMenuBtn?.addEventListener("click", showHelpMenu);

        document.getElementById("closeHelpConfirmBtn")?.addEventListener("click", () => {
            helpWindow.style.display = "none";
            showHelpMenu();
        });
    }

    function refreshHelpLabels() {
        const helpMessageInput = document.getElementById("helpMessageInput");
        if (helpMessageInput) helpMessageInput.placeholder = I18n.getText("help_issue_placeholder");
        document.querySelectorAll("#helpMenu [data-i18n], #helpConfirmation [data-i18n]").forEach((el) => {
            const k = el.getAttribute("data-i18n");
            if (k) el.textContent = I18n.getText(k);
        });
        const okBtn = document.getElementById("closeHelpConfirmBtn");
        if (okBtn && okBtn.hasAttribute("data-i18n")) okBtn.textContent = I18n.getText(okBtn.getAttribute("data-i18n"));
    }

    function initAppStoreButtons() {
        const appStoreBtn = document.getElementById("appStoreBtn");
        const googlePlayBtn = document.getElementById("googlePlayBtn");
        appStoreBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("https://www.apple.com/app-store/", "_blank", "noopener,noreferrer");
        });
        googlePlayBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            window.open("https://play.google.com/store/", "_blank", "noopener,noreferrer");
        });
    }

    function init() {
        initContentProtection();
        initFloatingMenu();
        initChat();
        initHelp();
        initAppStoreButtons();
    }

    return { init, refreshHelpLabels };
})();
window.UI = UI;
