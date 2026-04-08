// 🔥 Firebase init already hona chahiye

const verificationId = sessionStorage.getItem("verificationId");

if (!verificationId) {
  alert("Session expired. Please login again.");
  window.location.href = "login.html";
}

// DOM
const otpInput = document.getElementById("otp");
const loading = document.getElementById("loading");

// Firestore
const db = firebase.firestore();

// ================= VERIFY OTP =================
function verifyOtp() {

  let code = otpInput.value.trim();

  if (code === "" || code.length < 6) {
    alert("Enter valid OTP");
    return;
  }

  loading.style.display = "flex";

  const credential = firebase.auth.PhoneAuthProvider.credential(
    verificationId,
    code
  );

  firebase.auth().signInWithCredential(credential)
    .then((result) => {

      const user = result.user;

      if (!user) {
        alert("User null");
        loading.style.display = "none";
        return;
      }

      const phoneNumber = user.phoneNumber;

      // 🔥 CHECK USER IN FIRESTORE
      db.collection("users")
        .where("number", "==", phoneNumber)
        .get()
        .then((querySnapshot) => {

          if (querySnapshot.empty) {
            // 🔥 NEW USER → CREATE
            createUser(phoneNumber);
          } else {

            querySnapshot.forEach((doc) => {
              let data = doc.data();
              let level = parseInt(data.level);

              loading.style.display = "none";

              if (level === 1) {
                window.location.href = "complete-profile.html";
              } 
              else if (level === 2) {
                window.location.href = "create-pin.html";
              }
            });
          }
        })
        .catch(() => {
          loading.style.display = "none";
          alert("Error fetching user");
        });

    })
    .catch((error) => {
      alert("Invalid OTP");
      loading.style.display = "none";
    });
}

// ================= CREATE NEW USER =================
function createUser(phone) {

  // Default data (same Android common_code)
  const userData = {
    level: "1",
    number: phone,
    profile_status: "not completed",
    verification_status: "not completed",
    first_level_signup_time: firebase.firestore.FieldValue.serverTimestamp()
  };

  db.collection("users")
    .add(userData)
    .then(() => {

      // Save session
      localStorage.setItem("login_status", "otp_complete");

      loading.style.display = "none";

      alert("Signup success 🚀");

      window.location.href = "complete-profile.html";
    })
    .catch(() => {
      loading.style.display = "none";
      alert("Error creating user");
    });
}

// ================= RESEND =================
function resendOtp() {
  window.location.href = "login.html";
}

// ================= TIMER =================
let time = 120;
const timerEl = document.getElementById("timer");

const interval = setInterval(() => {

  let min = Math.floor(time / 60);
  let sec = time % 60;

  timerEl.innerText =
    `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  if (time <= 0) {
    clearInterval(interval);
    timerEl.innerText = "Expired ⏱️";
  }

  time--;

}, 1000);
