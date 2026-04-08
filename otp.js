// 🔥 Check if verificationId exists
const verificationId = sessionStorage.getItem("verificationId");

if (!verificationId) {
  alert("Session expired. Please login again.");
  window.location.href = "login.html";
}

// DOM
const otpInput = document.getElementById("otp");
const loading = document.getElementById("loading");

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

  try {
    // 🔥 Create credential manually (IMPORTANT FIX)
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      code
    );

    // 🔐 Sign in (same as Android signInWithCredential)
    firebase.auth().signInWithCredential(credential)
      .then((result) => {

        // ✅ Success
        alert("Login Success 🚀");

        // Clear session
        sessionStorage.removeItem("verificationId");

        // Redirect
        window.location.href = "dashboard.html";
      })
      .catch((error) => {

        // ❌ Error
        alert("Invalid OTP");

        loading.style.display = "none";
      });

  } catch (err) {
    alert("Error: " + err.message);
    loading.style.display = "none";
  }
}

// ================= RESEND OTP =================
function resendOtp() {
  alert("Resend OTP feature coming soon 🔄");
}

// ================= TIMER =================
let time = 120;
const timerEl = document.getElementById("timer");

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
