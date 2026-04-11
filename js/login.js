const phoneInput = document.getElementById("phone");
const btn = document.getElementById("sendOtpBtn");
const loading = document.getElementById("loading");

let recaptchaVerifier;
let confirmationResult;

// Initialize reCAPTCHA
window.onload = function () {
    recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
            size: "normal",
            callback: function () {
                console.log("reCAPTCHA verified");
            },
            "expired-callback": function () {
                alert("reCAPTCHA expired. Please refresh.");
            }
        }
    );

    recaptchaVerifier.render();
};

// Send OTP
btn.addEventListener("click", sendOtp);

function sendOtp() {
    const phone = phoneInput.value.trim();

    // Validate Indian phone number
    if (!/^[6-9]\d{9}$/.test(phone)) {
        alert("Enter a valid 10-digit Indian phone number.");
        return;
    }

    const fullPhone = "+91" + phone;

    loading.style.display = "flex";
    btn.disabled = true;

    firebase.auth().signInWithPhoneNumber(fullPhone, recaptchaVerifier)
        .then((result) => {
            confirmationResult = result;

            // Store verification ID
            sessionStorage.setItem(
                "verificationId",
                result.verificationId
            );

            sessionStorage.setItem("phone", fullPhone);

            // Redirect to OTP page
            window.location.href = "otp.html";
        })
        .catch((error) => {
            console.error("OTP Error:", error);
            alert(error.message);

            loading.style.display = "none";
            btn.disabled = false;
        });
}
