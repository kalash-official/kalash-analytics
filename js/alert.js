function showToast(message, duration = 3000, type = "info") {
    // Remove existing toast if present
    const existingToast = document.querySelector(".simple-toast");
    if (existingToast) {
        existingToast.remove();
    }

    // Create toast element
    const toast = document.createElement("div");
    toast.className = `simple-toast ${type}`;
    toast.textContent = message;

    // Add toast to body
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add("show");
    }, 50);

    // Hide and remove toast
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}
