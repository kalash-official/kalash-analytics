function showCustomAlert(options) {
    const {
        type = "info",
        title = "Notification",
        message = "This is a custom alert.",
        showCancel = false,
        okText = "OK",
        cancelText = "Cancel",
        onOk = null,
        onCancel = null
    } = options;

    const icons = {
        success: "✔",
        error: "✖",
        warning: "⚠",
        info: "ℹ",
        confirm: "❓"
    };

    const container = document.getElementById("customAlertContainer");

    const alertHTML = `
        <div class="custom-alert-overlay">
            <div class="custom-alert ${type}">
                <div class="custom-alert-icon">${icons[type] || "ℹ"}</div>
                <div class="custom-alert-title">${title}</div>
                <div class="custom-alert-message">${message}</div>
                <div class="custom-alert-buttons">
                    ${showCancel ? `<button class="custom-alert-btn btn-cancel">${cancelText}</button>` : ""}
                    <button class="custom-alert-btn btn-ok">${okText}</button>
                </div>
            </div>
        </div>
    `;

    container.innerHTML = alertHTML;

    const overlay = container.querySelector(".custom-alert-overlay");
    const okBtn = container.querySelector(".btn-ok");
    const cancelBtn = container.querySelector(".btn-cancel");

    function closeAlert() {
        overlay.style.opacity = "0";
        setTimeout(() => {
            container.innerHTML = "";
        }, 200);
    }

    okBtn.addEventListener("click", () => {
        closeAlert();
        if (typeof onOk === "function") onOk();
    });

    if (cancelBtn) {
        cancelBtn.addEventListener("click", () => {
            closeAlert();
            if (typeof onCancel === "function") onCancel();
        });
    }
}

/* Toast Notification */
function showToast(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    toast.innerText = message;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "20px",
        right: "20px",
        background: "#333",
        color: "#fff",
        padding: "12px 18px",
        borderRadius: "8px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        zIndex: "9999",
        opacity: "0",
        transition: "0.3s"
    });

    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = "1", 100);
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
    }, duration);
}
