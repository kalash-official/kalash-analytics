// DOM
const otpInput = document.getElementById("otp");
const loading = document.getElementById("loading");
const timerEl = document.getElementById("timer");

// ================= VERIFY OTP =================
function verifyOtp() {

  let code = otpInput.value.trim();

  // 🔴 Validation (same as Android)
  if (code === "" || code.length < 6) {
    alert("Enter valid OTP");
    return;
  }

  // 🔄 Loading ON
  loading.style.display = "flex";

  // Firebase verify
  window.confirmationResult.confirm(code)
    .then((result) => {

      // ✅ Success (same as signInWithCredential)
      alert("Login Success 🚀");

      // redirect (same as Intent)
      window.location.href = "dashboard.html";

    })
    .catch((error) => {

      // ❌ Error (same as Toast)
      alert("Invalid OTP");

      // loading OFF
      loading.style.display = "none";
    });
}

// ================= RESEND OTP =================
function resendOtp() {

  alert("Resending OTP...");

  // 🔥 IMPORTANT:
  // real resend ke liye phone number store karna padega
  // abhi demo hai

  // Example future logic:
  // sendOtp() again

}

// ================= TIMER =================
let time = 120; // 2 minutes

const interval = setInterval(() => {

  let minutes = Math.floor(time / 60);
  let seconds = time % 60;

  timerEl.innerText =
    `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (time <= 0) {
    clearInterval(interval);
    timerEl.innerText = "Expired ⏱️";
  }

  time--;

}, 1000);
