// DOM
const phoneInput = document.querySelector("input");
const btn = document.querySelector(".btn");
const loading = document.getElementById("loading");

// Recaptcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  size: 'normal'
});

// Click event
btn.addEventListener("click", sendOtp);

// FUNCTION (same as Android sendOtp)
function sendOtp() {

  let phone = phoneInput.value.trim();

  // 🔴 Validation (same as Android)
  if (phone === "" || phone.length < 10) {
    alert("Enter valid phone");
    return;
  }

  // 🔄 Loading ON
  loading.style.display = "flex";
  btn.disabled = true;

  let fullPhone = "+91" + phone;

  // Firebase call (same logic)
  firebase.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier)

    .then((confirmationResult) => {

      // save verificationId (same concept)
      window.confirmationResult = confirmationResult;

      // Navigate to OTP page (same as Intent)
      window.location.href = "otp.html";

      // loading OFF
      loading.style.display = "none";
      btn.disabled = false;
    })

    .catch((error) => {

      // Error message (same as Toast)
      alert("Error: " + error.message);

      // loading OFF
      loading.style.display = "none";
      btn.disabled = false;
    });
}
