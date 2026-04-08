const phoneInput = document.querySelector("input");
const btn = document.querySelector(".btn");
const loading = document.getElementById("loading");

// Recaptcha
window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
  size: 'invisible'
});

// Click
btn.addEventListener("click", sendOtp);

function sendOtp() {
  let phone = phoneInput.value.trim();

  if (phone === "" || phone.length < 10) {
    alert("Enter valid phone");
    return;
  }

  loading.style.display = "flex";
  btn.disabled = true;

  let fullPhone = "+91" + phone;

  // firebase.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier)
  //   .then((confirmationResult) => {

  //    window.confirmationResult = confirmationResult;
  //    window.confirmationResultGlobal = confirmationResult;
  //    window.location.href = "otp.html";
  //    sessionStorage.setItem("verificationId", confirmationResult.verificationId);
      
  //   })
  //   .catch((error) => { 
  //     alert(error.message);
  //     loading.style.display = "none";
  //     btn.disabled = false;
  //   });

  firebase.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier)
  .then((confirmationResult) => {

    // 🔥 FIRST save karo
    sessionStorage.setItem("verificationId", confirmationResult.verificationId);

    // optional (not needed now)
    window.confirmationResult = confirmationResult;

    // 🔥 THEN redirect
    window.location.href = "otp.html";
  })
  .catch((error) => {
    alert(error.message);
    loading.style.display = "none";
    btn.disabled = false;
  });
}
