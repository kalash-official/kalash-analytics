const auth = firebase.auth();
const db = firebase.firestore();

const badge = document.getElementById("queueBadge");

// Initially hide
badge.style.display = "none";

auth.onAuthStateChanged((user) => {
    if (user) {

        const phone = user.phoneNumber;
        let count = 0;

        alert(phone");
        
        db.collection("users_setting")
          .where("live_srno", ">", 0)
          .orderBy("live_srno", "asc")
          .get()
          .then((snapshot) => {

              snapshot.forEach((doc) => {
                  const data = doc.data();
                  const number = data.number;

                  count++;

                  if (number === phone) {
                      badge.style.display = "flex"; // show badge
                      badge.innerText = count;
                      return; // break equivalent
                  }
              });

          })
          .catch((error) => {
              console.error("error", error);
          });

    } else {
        console.log("User not logged in");
    }
});
